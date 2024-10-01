import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { BlogPostAnalyticsController } from "../blogPostAnalytics.controller";
import { BlogPostAnalyticsService } from "../blogPostAnalytics.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  blogPostId: 42,
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  viewCount: 42,
};
const CREATE_RESULT = {
  blogPostId: 42,
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  viewCount: 42,
};
const FIND_MANY_RESULT = [
  {
    blogPostId: 42,
    createdAt: new Date(),
    id: "exampleId",
    updatedAt: new Date(),
    viewCount: 42,
  },
];
const FIND_ONE_RESULT = {
  blogPostId: 42,
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  viewCount: 42,
};

const service = {
  createBlogPostAnalytics() {
    return CREATE_RESULT;
  },
  blogPostAnalyticsItems: () => FIND_MANY_RESULT,
  blogPostAnalytics: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("BlogPostAnalytics", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BlogPostAnalyticsService,
          useValue: service,
        },
      ],
      controllers: [BlogPostAnalyticsController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /blogPostAnalytics", async () => {
    await request(app.getHttpServer())
      .post("/blogPostAnalytics")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /blogPostAnalytics", async () => {
    await request(app.getHttpServer())
      .get("/blogPostAnalytics")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /blogPostAnalytics/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/blogPostAnalytics"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /blogPostAnalytics/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/blogPostAnalytics"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /blogPostAnalytics existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/blogPostAnalytics")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/blogPostAnalytics")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
