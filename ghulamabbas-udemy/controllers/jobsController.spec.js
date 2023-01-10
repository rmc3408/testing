import Job from "../models/jobs.js";
import {
  deleteJob,
  getJob,
  getJobs,
  newJob,
  updateJob,
} from "./jobsController";

const mockJob = {
  _id: "63bdeec280b78113b9c9b36f",
  title: "Node Developer",
  description: "Must be a full-stack developer, able to implement MERN stack paradigm.",
  email: "employeer1@gmail.com",
  address: "651 Rr 2, Oquawka, IL, 61469",
  company: "Knack Ltd",
  industry: [],
  positions: 2,
  salary: 155000,
  user: "6368dadd983d6c4b181e37c1",
  postingDate: "2022-11-08T22:31:52.441Z",
};

const mockRequest = {
  body: {
    title: "string",
    description: "string",
    email: "string",
    address: "string",
    company: "string",
    industry: "string",
    positions: 2,
  },
  query: "",
  params: { id: "63bdeec280b78113b9c9b36f" },
  user: { id: "6368dadd983d6c4b181e37c1" }
}

const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe("Jobs Controller", () => {
  test("should get all jobs", async () => {
    jest.spyOn(Job, "find").mockImplementationOnce(() => ({
      limit: () => ({
        skip: jest.fn().mockResolvedValueOnce([mockJob]),
      }),
    }));

    await getJobs(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      jobs: [mockJob],
    });
  });

  test("should create a new job", async () => {
    jest.spyOn(Job, "create").mockResolvedValue(mockJob);

    await newJob(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ job: mockJob });
  });

  it("should throw validation error", async () => {
    jest.spyOn(Job, "create").mockRejectedValueOnce({ name: "ValidationError" });

    const mockReq = {
      ...mockRequest,
      body: {
        title: "Node Developer",
      }
    };

    await newJob(mockReq, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Please enter all values" });
  });
});

describe("Get Single Job", () => {
  it("should throw job not found error", async () => {
    jest.spyOn(Job, "findById").mockResolvedValueOnce(null);

    await getJob(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Job not found",
    });
  });

  it("should get job by ID", async () => {
    jest.spyOn(Job, "findById").mockResolvedValueOnce(mockJob);

    await getJob(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      job: mockJob,
    });
  });

  it("should throw invalid ID error", async () => {
    jest.spyOn(Job, "findById").mockRejectedValueOnce({ name: "CastError" });

    await getJob(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Please enter correct id",
    });
  });
});

describe("Update a Job", () => {
  // jest.setTimeout(30 * 1000)

  it("should throw job not found error", async () => {
    jest.spyOn(Job, "findById").mockResolvedValueOnce(null);

    await updateJob(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Job not found",
    });
  });


  it("should update the job by id", async () => {
    const title = "React Developer";
    const updatedJob = { ...mockJob, title };

    jest.spyOn(Job, "findById").mockResolvedValueOnce(mockJob);
    jest.spyOn(Job, "findByIdAndUpdate").mockResolvedValueOnce(updatedJob);

    const mockReq = {
      ...mockRequest,
      params: { id: "636ad8d88242262f5d0d85cc" },
      user: {
        id: "6368dadd983d6c4b181e37c1",
      },
      body: { title },
    };

    await updateJob(mockReq, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      job: updatedJob,
    });
  });
});