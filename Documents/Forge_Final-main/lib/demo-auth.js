/**
 * Local demo login (no Atomic Center).
 * Default credentials: user / user.
 * Enabled via DEMO_LOGIN=1, app-config demoLogin, or automatically on Vercel.
 */

const { loadConfig, isServerlessRuntime } = require('./device-config');
const deviceProfile = require('./device-profile');
const session = require('./session');
const dashboardRbac = require('./dashboard-rbac');
const masterControl = require('./master-control');

const DEFAULT_USERNAME = 'user';
const DEFAULT_PASSWORD = 'user';

function isDemoLoginEnabled() {
  if (process.env.DEMO_LOGIN === '0') return false;
  if (process.env.DEMO_LOGIN === '1') return true;
  const cfg = loadConfig();
  if (cfg.demoLogin === false) return false;
  if (cfg.demoLogin === true) return true;
  // Vercel deploys usually cannot reach Atomic Center — default to demo login.
  return isServerlessRuntime();
}

function getDemoCredentials() {
  return {
    username: String(process.env.DEMO_USERNAME || loadConfig().demoUsername || DEFAULT_USERNAME).trim(),
    password: String(process.env.DEMO_PASSWORD || loadConfig().demoPassword || DEFAULT_PASSWORD),
  };
}

function credentialsMatch(username, password) {
  const demo = getDemoCredentials();
  return (
    String(username || '').trim().toLowerCase() === demo.username.toLowerCase()
    && String(password || '') === demo.password
  );
}

function ensureDemoWorkspace({ meshUserId, username }) {
  if (!deviceProfile.isRegistered()) {
    deviceProfile.saveProfile({
      deviceSerial: 'DEMO-DEVICE',
      deviceName: 'Demo Forge Device',
      deviceType: 'edge',
      operatingSystem: 'Linux',
      organizationName: 'Demo Organization',
      adminName: username,
      adminRole: 'Owner',
      email: `${username}@demo.local`,
      phone: null,
      country: 'Demo',
      city: 'Local',
      clusterMode: 'standalone',
      registerMeshCentral: false,
      meshGroupName: null,
      registeredBy: username,
    });
  } else if (!deviceProfile.getClusterMode()) {
    deviceProfile.setClusterMode('standalone');
  }

  deviceProfile.markUserOnboarded({
    meshUserId,
    email: `${username}@demo.local`,
  });

  const roleId = dashboardRbac.getDefaultRoleIdForClusterMode('standalone');
  dashboardRbac.setUserRole(meshUserId, roleId);

  masterControl.bootstrapMasterControl({
    meshUserId,
    username,
    organizationName: 'Demo Organization',
  });
}

function tryDemoLogin(username, password) {
  if (!isDemoLoginEnabled()) return null;
  if (!credentialsMatch(username, password)) {
    return {
      status: 401,
      data: { error: 'Invalid username or password.' },
    };
  }

  const demo = getDemoCredentials();
  const meshUserId = `user//${demo.username.toLowerCase()}`;

  ensureDemoWorkspace({ meshUserId, username: demo.username });

  const sess = session.createSession({
    meshUserId,
    username: demo.username,
    password: demo.password,
    email: `${demo.username}@demo.local`,
  });

  if (sess?.sessionId) {
    session.confirmClusterRole(sess.sessionId);
    session.confirmUserRole(sess.sessionId, dashboardRbac.getDefaultRoleIdForClusterMode('standalone'));
  }

  return {
    status: 200,
    data: {
      success: true,
      message: `Welcome, ${demo.username}! (demo mode — no Atomic Center)`,
      username: demo.username,
      userId: meshUserId,
      email: `${demo.username}@demo.local`,
      offline: true,
      mode: 'demo',
      sessionId: sess.sessionId,
      onboardingComplete: true,
      redirectTo: '/overview',
      demo: true,
    },
  };
}

function getDemoPublicInfo() {
  if (!isDemoLoginEnabled()) {
    return { demoLogin: false };
  }
  const demo = getDemoCredentials();
  return {
    demoLogin: true,
    demoUsername: demo.username,
    // Intentionally expose the password so the login page can show the hint.
    demoPasswordHint: demo.password,
  };
}

module.exports = {
  isDemoLoginEnabled,
  getDemoCredentials,
  tryDemoLogin,
  ensureDemoWorkspace,
  getDemoPublicInfo,
};
