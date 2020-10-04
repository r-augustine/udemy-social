import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileId } from "../../actions/profile";

const Profile = ({
  match,
  getProfileId,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileId(match.params.id);
  }, [getProfileId]);

  return (
    <>
      {profile == null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn btn-light'>
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileId })(Profile);
