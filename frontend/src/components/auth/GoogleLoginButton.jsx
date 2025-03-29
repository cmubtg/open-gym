import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "context/AuthContext";

function GoogleLoginButton() {
  const { login, setShowLogin } = useAuth();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      console.log("Google login success, credential:", credentialResponse);
      setShowLogin(false);
      const { credential } = credentialResponse;

      // Add more detailed logging
      console.log("Attempting to login with credential");
      const success = await login(credential);
      console.log("Login success status:", success);

      if (success) {
        console.log("Login successful");
      } else {
        console.log("Login failed - invalid email domain");
        setShowLogin(true);
        alert("Invalid email domain.");
      }
    } catch (error) {
      console.error("Login failed with error:", error);
    }
  };

  return (
      <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={(error) => {
            console.error("Google login failed with error:", error);
            alert("Google login failed");
          }}
          useOneTap={false}
          uxMode="redirect"
          redirectUri={window.location.origin}
      />
  );
}
export default GoogleLoginButton;
