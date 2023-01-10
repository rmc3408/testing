const { getData } = require('../utils/function');
const mockCrypto = require('crypto');


test('should get data', async () => {
  
  jest.spyOn(mockCrypto, 'randomBytes').mockResolvedValueOnce('fake spyon');
  
  const data = await getData();
  //console.log(data);
})
