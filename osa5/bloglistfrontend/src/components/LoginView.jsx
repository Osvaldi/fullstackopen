const LoginView = ({ username, password, handleLogin, onUsernameChange, onPasswordChange  }) => (
<form onSubmit={handleLogin}>
    <h2>log in to application</h2>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={onUsernameChange}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

export default LoginView
