// src/__mocks__/database.ts

const createMockDb = () => {
  let chainedMethods: any = {};
  const resetChainedMethods = () => {
    chainedMethods = {};
  };

  const db = {
    insert: jest.fn().mockImplementation((table) => {
      resetChainedMethods();
      chainedMethods.table = table;
      return {
        values: jest.fn().mockImplementation((values) => {
          chainedMethods.values = values;
          return {
            returning: jest.fn().mockImplementation(() => {
              return Promise.resolve([
                { 
                  id: 1, 
                  ...chainedMethods.values 
                }
              ]);
            })
          };
        })
      };
    }),

    select: jest.fn().mockImplementation((...columns) => {
      resetChainedMethods();
      chainedMethods.columns = columns;
      return {
        from: jest.fn().mockImplementation((table) => {
          chainedMethods.table = table;
          return {
            where: jest.fn().mockImplementation((condition) => {
              chainedMethods.where = condition;
              return Promise.resolve([
                { 
                  id: 1,
                  email: 'test@example.com',
                  name: 'John Doe',
                  password: 'hashedPassword'
                }
              ]);
            }),
            limit: jest.fn().mockImplementation((limit) => {
              chainedMethods.limit = limit;
              return Promise.resolve([
                { 
                  id: 1,
                  name: 'John Doe'
                }
              ]);
            })
          };
        }),
        where: jest.fn().mockImplementation((condition) => {
          chainedMethods.where = condition;
          return Promise.resolve([
            { 
              id: 1,
              email: 'test@example.com',
              password: 'hashedPassword'
            }
          ]);
        })
      };
    }),

    update: jest.fn().mockImplementation((table) => {
      resetChainedMethods();
      chainedMethods.table = table;
      return {
        set: jest.fn().mockImplementation((values) => {
          chainedMethods.values = values;
          return {
            where: jest.fn().mockImplementation((condition) => {
              chainedMethods.where = condition;
              return Promise.resolve([
                { 
                  id: 1,
                  ...values
                }
              ]);
            })
          };
        })
      };
    }),

    delete: jest.fn().mockImplementation(() => {
      resetChainedMethods();
      return {
        from: jest.fn().mockImplementation((table) => {
          chainedMethods.table = table;
          return {
            where: jest.fn().mockImplementation((condition) => {
              chainedMethods.where = condition;
              return Promise.resolve({ count: 1 });
            })
          };
        })
      };
    }),

    _reset: () => {
      jest.clearAllMocks();
      resetChainedMethods();
    }
  };

  return db;
};

export const db = createMockDb();