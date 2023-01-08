const { getData } = require('../function');
const mockCrypto = require('crypto');

jest.mock('crypto');

test('should get data', async () => {
  //mockCrypto.randomBytes = jest.fn().mockImplementation(() => Promise.resolve('fake'));
  mockCrypto.randomBytes.mockResolvedValueOnce('fake buffer');
  
  const data = await getData();
  console.log(data);
})

