import axios from 'axios';

export const BASE_URL = 'https://media.mw.metropolia.fi/wbma';
export const TAG = '098fea725eb66a1';
export const client = axios;

export const CATEGORY_TAGS =
[
  {
    tag: '897d7ed4',
    name: 'Kitchen',
    icon: 'restaurant',
    color: '#f8b88b'
  },
  {
    tag: '5b03afa1',
    name: 'Sport',
    icon: 'sports-football',
    color: '#faf884'
  },
  {
    tag: '50e76249',
    name: 'Clothes',
    icon: 'dry-cleaning',
    color: '#baed91'
  },
  {
    tag: 'f6a462c9',
    name: 'Furniture',
    icon: 'hotel',
    color: '#b2cefe'
  },
  {
    tag: '8ce53d34',
    name: 'Electornics',
    icon: 'power',
    color: '#f2a2e8'
  },
  {
    tag: '87e93b34',
    name: 'Other',
    icon: 'explore',
    color: '#f2a2e8'
  },
] 

/**
 * Helper function for building API URL routes.
 *
 * @param {string} route API endpoint URL
 * @param {string} param URL parameter (optional)
 */
const urlBuilder = (route, param) => {
  let URL = `${BASE_URL}/${route}`;
  return param ? `${URL}/${param}` : URL;
};

/**
 * Helper function for setting JWT to
 * x-access-token header.
 * @param {string} token
 * @returns {{'x-access-token': string}} Header with JWT set.
 */
export const setJWT = (token) => ({ 'x-access-token': token });

export const routes = {
  auth: {
    /**
     * PERMISSION - ALL
     *
     * @method POST
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Authentication-PostAuth
     */
    login: urlBuilder('login'),
  },
  user: {
    /**
     * PERMISSION - ALL
     *
     * Check if username is in use.
     *
     * @method GET
     * @param {string} username
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName
     */
    nameExists: (username) => urlBuilder('users/username', username),

    /**
     * PERMISSION - ALL
     *
     * Create new user.
     *
     * @method POST
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-User-PostUser
     */
    create: urlBuilder('users'),

    /**
     * PERMISSION - ADMIN
     *
     * Delete existing user.
     *
     * @method DELETE
     * @param {number} id
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-User-DeleteUser
     */
    delete: (id) => urlBuilder('users', id),

    /**
     * PERMISSION - TOKEN
     *
     * Modify existing user values.
     *
     * @method PUT
     * @param {number} id
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-User-PutUser
     */
    modify: (id) => urlBuilder('users', id),

    /**
     * PERMISSION - TOKEN
     *
     * Get user info by id.
     *
     * @method GET
     * @param {number} id User id.
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-User-GetUser
     */
    info: (id) => urlBuilder('users', id),

    /**
     *
     * PERMISSION - TOKEN
     *
     * Get all users in a list.
     *
     * @method GET
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-User-GetUsers
     */
    all: urlBuilder('users'),

    /**
     * PERMISSION - TOKEN
     *
     * Get current user's info.
     *
     * @method GET
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-User-GetCurrentUser
     */
    myInfo: urlBuilder('users/user'),
  },
  media: {
    /**
     * PERMISSION - TOKEN
     *
     * Delete media.
     *
     * @method DELETE
     * @param {number} id File id.
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Media-DeleteMediaFile
     */
    delete: (id) => urlBuilder('media', id),

    /**
     * PERMISSION - ALL
     *
     * Request file info for specified file id.
     *
     * @method GET
     * @param {number} id File id.
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Media-GetSpecificMediaFile
     */
    file: (id) => urlBuilder('media', id),

    /**
     * PERMISSION - ALL
     *
     * Get all media in an array + counts for each media type.
     *
     * @method GET
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Media-GetAllMediaFiles
     */
    all: urlBuilder('media/all'),

    /**
     * PERMISSION - ALL
     *
     * Get all media uploaded by specified user.
     *
     * @method GET
     * @param {number} userId
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Media-GetSpecificUserMediaFiles
     */
    usersFiles: (userId) => urlBuilder('media/user', userId),

    /**
     * PERMISSION - TOKEN
     *
     * Get all media uploaded by current active user.
     *
     * @method GET
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Media-GetCurrentUserMediaFiles
     */
    currentUsersFiles: urlBuilder('media/user'),

    /**
     * PERMISSION - ALL
     *
     * Get list of the newest media uploads.
     *
     * @method GET
     * @param {number} start
     * @param {number} limit
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Media-GetMediaFiles
     */
    newest: (start, limit) => {
      let result = `${urlBuilder('media')}`;

      // Check if both parameters are present.
      if (start && limit) {
        result += `?start=${start}&limit=${limit}`;
        return result;
      }

      // Check if either parameter is present.
      if (start) {
        result += `?start=${start}`;
      } else if (limit) {
        result += `?limit=${limit}`;
      }

      return result;
    },

    /**
     * PERMISSION - TOKEN
     *
     * Search for media by title or description.
     *
     * @method POST
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Media-SearchMediaFiles
     */
    search: urlBuilder('media/search'),

    /**
     * PERMISSION - TOKEN
     *
     * Update existing media.
     *
     * @method PUT
     * @param {number} id
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Media-UpdateMediaFile
     */
    update: (id) => urlBuilder('media', id),

    /**
     * PERMISSION - TOKEN
     *
     * Upload new media.
     *
     * multipart/form-data
     * @method POST
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Media-PostMediaFile
     */
    uploads: urlBuilder('media'),
  },
  uploads: {
    /**
     * PERMISSION - ALL
     *
     * Static file location on the server.
     *
     * @method GET
     * @param {string} name
     */
    file: (name) => urlBuilder('uploads', name),
  },
  comment: {
    /**
     * PERMISSION - TOKEN
     *
     * Delete user's comment.
     *
     * @method DELETE
     * @param {number} id comment id.
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Comment-DeleteComment
     */
    delete: (id) => urlBuilder('comments', id),

    /**
     * PERMISSION - TOKEN
     *
     * Post new comment.
     *
     * @method POST
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Comment-PostComment
     */
    post: urlBuilder('comments'),

    /**
     * PERMISSION - ALL
     *
     * Get all comments posted to media file.
     *
     * @method GET
     * @param {number} id File id.
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Comment-GetFileComments
     */
    getByFile: (id) => urlBuilder('comments/file', id),

    /**
     * PERMISSION - TOKEN
     *
     * Get all comments by current user.
     *
     * @method GET
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Comment-GetCurrentUserComments
     */
    byUser: urlBuilder('comments'),
  },
  favourite: {
    /**
     * PERMISSION - TOKEN
     *
     * Favourite media post.
     *
     * @method POST
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Favourite-PostFavourite
     */
    new: urlBuilder('favourites'),

    /**
     * PERMISSION - TOKEN
     *
     * Remove file from favourites.
     *
     * @method DELETE
     * @param {number} id File id.
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Favourite-DeleteFavourite
     */
    delete: (id) => urlBuilder('favourites/file', id),

    /**
     * PERMISSION - ALL
     *
     * Get all those users who favourited specified file.
     *
     * @method GET
     * @param {number} id File id
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Favourite-GetFileFavourites
     */
    byFile: (id) => urlBuilder('favourites/file', id),

    /**
     * PERMISSION - TOKEN
     *
     * Get all favourites by current user.
     *
     * @method GET
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Favourite-GetCurrentUserFavourites
     */
    byUser: urlBuilder('favourites'),
  },
  rating: {
    /**
     *
     * @method
     * @param {number} id
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Rating-PostRating
     */
    create: urlBuilder('ratings'),

    /**
     *
     * @method DELETE
     * @param {number} id
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Rating-DeleteRating
     */
    delete: (id) => urlBuilder('ratings/file', id),

    /**
     *
     * @method GET
     * @param {number} id
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Rating-GetFileRatings
     */
    byFile: (id) => urlBuilder('ratings/file', id),

    /**
     * @method GET
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Rating-GetCurrentUserRatings
     */
    byUser: urlBuilder('ratings'),
  },
  tag: {
    /**
     * PERMISSION - ADMIN
     *
     * @method DELETE
     * @param {number} id tag id.
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Tag-DeleteTag
     */
    delete: (id) => urlBuilder('tags', id),

    /**
     * PERMISSION - TOKEN
     *
     * Create a new tag.
     *
     * @method POST
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Tag-PostTag
     */
    create: urlBuilder('tags'),

    /**
     * PERMISSION - ALL
     *
     * Get all files related to specified tag.
     *
     * @method GET
     * @param {string} tag
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Tag-GetTagFiles
     */
    files: (tag) => urlBuilder('tags', tag),

    /**
     * PERMISSION - ALL
     *
     * Get all tags related to specified file.
     *
     * @method GET
     * @param {number} id
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Tag-GetFileTags
     */
    filesTags: (id) => urlBuilder('tags/file', id),

    /**
     * PERMISSION - TOKEN
     *
     * Get all tags.
     *
     * @method GET
     * @see https://media.mw.metropolia.fi/wbma/docs/#api-Tag-GetTags
     */
    all: urlBuilder('tags'),
  },
};
