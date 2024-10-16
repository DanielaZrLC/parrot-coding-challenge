// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import {
//   testTokenAPI,
//   getStoreIdAPI,
//   fetchItemsAPI,
//   updateItemsAPI,
// } from '../../middlewares/fetch/authFlowMiddleware';
// import { fetchStoreAndProducts } from '../../lib/features/stores/storeSlice';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk'; // To test async actions

// const mockStore = configureStore([thunk]);

// describe('API calls', () => {
//   let mock: MockAdapter;

//   beforeEach(() => {
//     mock = new MockAdapter(axios);
//   });

//   afterEach(() => {
//     mock.reset();
//   });

//   it('should validate token successfully', async () => {
//     // Mock the API response for token validation
//     mock
//       .onGet(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/test`)
//       .reply(200, {
//         status: 'ok',
//       });

//     const response = await testTokenAPI('mockAccessToken');
//     expect(response.data.status).toEqual('ok');
//   });

//   it('should fetch store information successfully', async () => {
//     mock
//       .onGet(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`)
//       .reply(200, {
//         result: {
//           stores: [{ uuid: 'mockStoreId' }],
//         },
//       });

//     const response = await getStoreIdAPI('mockAccessToken');
//     expect(response.data.result.stores[0].uuid).toEqual('mockStoreId');
//   });

//   it('should fetch products successfully', async () => {
//     const mockStoreId = 'mockStoreId';
//     mock
//       .onGet(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/?store=${mockStoreId}`,
//       )
//       .reply(200, {
//         results: [{ name: 'mockProduct' }],
//       });

//     const response = await fetchItemsAPI(mockStoreId, 'mockAccessToken');
//     expect(response.data.results[0].name).toEqual('mockProduct');
//   });

//   it('should update product availability successfully', async () => {
//     const mockProductId = 'mockProductId';
//     mock
//       .onPut(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${mockProductId}/availability`,
//       )
//       .reply(200, {
//         success: true,
//       });

//     const response = await updateItemsAPI(
//       mockProductId,
//       'available',
//       'mockAccessToken',
//     );
//     expect(response.data.success).toBe(true);
//   });
// });
