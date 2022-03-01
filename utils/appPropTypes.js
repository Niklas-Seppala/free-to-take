import PropTypes from 'prop-types';

export const PostPropType = PropTypes.shape({
  description: PropTypes.string.isRequired,
  file_id: PropTypes.number.isRequired,
  filename: PropTypes.string.isRequired,
  media_type: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    email: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }),
  screenshot: PropTypes.string,
  thumbnails: PropTypes.shape({
    w160: PropTypes.string.isRequired,
    w320: PropTypes.string.isRequired,
    w640: PropTypes.string.isRequired,
  }),
  time_added: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

export const UserPropType = PropTypes.shape({
  email: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  full_name: PropTypes.string,
});
