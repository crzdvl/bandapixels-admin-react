import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { authActions } from '../_actions';

class HomePage extends React.Component {
  componentDidMount() {
    // this.props.dispatch(authActions.getAll());
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>
          Hi
          {user.firstName}
          !
        </h1>
        <p>You&apos;re logged in with React & JWT!!</p>
        <h3>Users from secure api end point:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
        <span className="text-danger">
          ERROR:
          {users.error}
        </span>
        )}
        {users.items
                    && (
                    <ul>
                        {/* eslint-disable-next-line no-shadow */}
                      {users.items.map((user) => (
                        <li key={user.id}>
                          {`${user.firstName} ${user.lastName}`}
                        </li>
                      ))}
                    </ul>
                    )}
        <p>
          <Link to="/">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
