import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNetwork } from '@hooks';
import { ROUTES } from '@constants';
import { ScreenWithBottomTabs } from '@templates';
import enTexts from '@translations/en.json';
import {
  SignIn,
  SignUp,
  UserProfile,
  ResetPassword,
  EditProfile,
  JournalPage,
  Home,
  Explore,
  AccountSettings,
  Account,
  Splash,
  Onboarding,
  PinnedPost,
  ChangePassword,
  ChangeEmail,
  Chat
} from '@screens';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  const isNetwork = useNetwork();

  return (
    <>
      <Splash
        isSplashVisible={!isNetwork}
        textToDisplay={enTexts.errorMessages.noInternetConnection}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<SignIn />} path={ROUTES.signIn} />
          <Route element={<SignUp />} path={ROUTES.signUp} />
          <Route element={<ResetPassword />} path={ROUTES.resetPassword} />
          <Route
            element={
              <ProtectedRoute>
                <ScreenWithBottomTabs />
              </ProtectedRoute>
            }
            path={ROUTES.root}
          >
            <Route element={<Explore />} path={ROUTES.explore} />
            <Route element={<Home />} path={ROUTES.home} />
            <Route
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
              path={ROUTES.profile}
            />
          </Route>
          <Route
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
            path={ROUTES.editProfile}
          />
          <Route
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
            path={`${ROUTES.chat}/:id`}
          />
          <Route
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
            path={`${ROUTES.authors}/:id`}
          />
          <Route
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
            path={`${ROUTES.settings}`}
          />
          <Route
            element={
              <ProtectedRoute>
                <JournalPage />
              </ProtectedRoute>
            }
            path={`${ROUTES.journals}/:id`}
          />
          <Route
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
            path={ROUTES.changePassword}
          />
          <Route
            element={
              <ProtectedRoute>
                <ChangeEmail />
              </ProtectedRoute>
            }
            path={ROUTES.changeEmail}
          />
          <Route
            element={
              <Splash
                isSplashVisible
                textToDisplay={enTexts.errorMessages.dataNotFound}
              />
            }
            path={ROUTES.notFound}
          />
          <Route element={<Onboarding />} path={ROUTES.onboarding} />
          <Route element={<PinnedPost />} path={ROUTES.pinned} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
