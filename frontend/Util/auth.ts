import { configureAuth } from '@hilla/react-auth';
import { UserInfoEndpoint } from 'Frontend/generated/endpoints';

// Configure auth to use `UserInfoService.getUserInfo`
const auth = configureAuth(UserInfoEndpoint.getUserInfo,{
    getRoles: (user)=>user.authorities
});

// Export auth provider and useAuth hook, which are automatically
// typed to the result of `UserInfoService.getUserInfo`
export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;