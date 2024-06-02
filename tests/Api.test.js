import axios from 'axios';
import { updateReactionCount } from '@/services/Api';

const API_URL = 'https://dummyjson.com';

jest.mock('axios');

describe('updateReactionCount function', () => {
  it('should make a POST request to update the reaction count', async () => {
    const postId = '123';
    const reactionType = 'likes';
    const count = 5;
    const responseData = { success: true };
    axios.post.mockResolvedValueOnce({ data: responseData });

    const response = await updateReactionCount(postId, reactionType, count);

    expect(response).toEqual(responseData); 
    expect(axios.post).toHaveBeenCalledWith(`${API_URL}/update-reaction`, { postId, reactionType, count });
  });

  it('should throw an error if the request fails', async () => {
    const postId = '123';
    const reactionType = 'likes';
    const count = 5;
    const error = new Error('Failed to update reaction count');
    axios.post.mockRejectedValueOnce(error);

    await expect(updateReactionCount(postId, reactionType, count)).rejects.toThrowError(error);
  });
});
