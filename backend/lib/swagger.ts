// lib/swagger.ts

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "TeamFlow API",
    version: "1.0.0",
    description: "Backend API documentation for TeamFlow app",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
          bio: { type: "string" },
          profileImage: { type: "string" },
          followers: {
            type: "array",
            items: { type: "string" },
          },
          following: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password", "name"],
                properties: {
                  email: { type: "string", example: "test@gmail.com" },
                  password: { type: "string", example: "123456" },
                  name: { type: "string", example: "John Doe" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User created successfully",
          },
        },
      },
    },

    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
          },
        },
      },
    },

    "/me": {
      get: {
        tags: ["User"],
        summary: "Get current user",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Returns logged-in user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },

    "/user/update": {
      put: {
        tags: ["User"],
        summary: "Update user profile",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  bio: { type: "string" },
                  profileImage: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Profile updated successfully",
          },
        },
      },
    },

    "/user/follow/{id}": {
      post: {
        tags: ["Social"],
        summary: "Follow a user",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "User followed",
          },
        },
      },
    },

    "/posts": {
  post: {
    tags: ["Posts"],
    summary: "Create a new post",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["content"],
            properties: {
              content: { type: "string", example: "Hello TeamFlow 👋" },
              image: { type: "string", example: "https://image-url.com/img.png" }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: "Post created successfully"
      }
    }
  }
},
"/feed": {
  get: {
    tags: ["Feed"],
    summary: "Get user feed (posts from followed users)",
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "List of feed posts",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  content: { type: "string" },
                  image: { type: "string" },
                  author: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      profileImage: { type: "string" }
                    }
                  },
                  createdAt: { type: "string" }
                }
              }
            }
          }
        }
      }
    }
  }
},
"/posts/user/{id}": {
  get: {
    tags: ["Posts"],
    summary: "Get posts by user",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      200: {
        description: "User posts list"
      }
    }
  }
},
"/posts/like/{id}": {
  post: {
    tags: ["Posts"],
    summary: "Like a post",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      200: {
        description: "Post liked"
      }
    }
  }
},
"/posts/unlike/{id}": {
  post: {
    tags: ["Posts"],
    summary: "Unlike a post",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" }
      }
    ],
    responses: {
      200: {
        description: "Post unliked"
      }
    }
  }
},
"/posts/comment/{id}": {
  post: {
    tags: ["Posts"],
    summary: "Add comment to post",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["text"],
            properties: {
              text: { type: "string", example: "Nice post 🔥" }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: "Comment added"
      }
    }
  }
},

    "/user/unfollow/{id}": {
      post: {
        tags: ["Social"],
        summary: "Unfollow a user",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "User unfollowed",
          },
        },
      },
    },
  },
};