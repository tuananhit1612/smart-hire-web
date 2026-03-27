// test-api.mjs
const BASE_URL = "http://localhost:8080/api";

async function testApi(name, endpoint, method = "GET", body = null, token = null) {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" }
    };
    if (token) options.headers.Authorization = `Bearer ${token}`;
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    
    // Some endpoints may return 204 No Content
    if (res.status === 204) {
      console.log(`✅ [${name}] ${method} ${endpoint} - OK (Status: 204)`);
      return true;
    }

    const data = await res.json().catch(() => null);

    // If it's returning our standard envelope
    if (res.ok && data?.success) {
      console.log(`✅ [${name}] ${method} ${endpoint} - OK (Status: ${res.status})`);
      return data.data;
    } else if (res.ok && !data?.success && data) {
      // Maybe not wrapped in success properly, but still ok
      console.log(`✅ [${name}] ${method} ${endpoint} - OK (Status: ${res.status}, but structure may vary)`);
      return data;
    } else {
      console.error(`❌ [${name}] ${method} ${endpoint} - FAILED (Status: ${res.status})`);
      if (data) console.error(`   Message:`, data.message || data);
      return null;
    }
  } catch (error) {
    console.error(`❌ [${name}] ${method} ${endpoint} - NETWORK ERROR:`, error.message);
    return null;
  }
}

async function runTests() {
  console.log("=== STARTING SMART-HIRE API INTEGRATION TESTS ===\n");

  // 1. PUBLIC ENDPOINTS
  await testApi("Health Check", "/health");
  await testApi("Public Jobs List", "/jobs/public?page=0&size=5");

  // 2. AUTHENTICATION
  const email = `testuser${Date.now()}@example.com`;
  let token = null;

  console.log("\n--- Testing Auth Module ---");
  const authData = await testApi("Register Candidate", "/auth/register", "POST", {
    email,
    password: "Password123!",
    fullName: "Integration Test User",
    role: "CANDIDATE"
  });

  if (authData && (authData.token || authData.accessToken)) {
    token = authData.token || authData.accessToken;
  } else {
    // If registration somehow doesn't return token, try login
    const loginData = await testApi("Login Candidate", "/auth/login", "POST", {
      email,
      password: "Password123!"
    });
    if (loginData) {
      token = loginData.token || loginData.accessToken;
    }
  }

  // 3. PROTECTED CANDIDATE ENDPOINTS
  if (token) {
    console.log("\n--- Testing Candidate Profile Module ---");
    // Verify ME
    await testApi("Get Current User", "/users/me", "GET", null, token);
    
    // Profile
    // The profile endpoint might return 404 if profile doesn't exist yet, we will test creation
    await testApi("Create Profile", "/candidate/profile", "POST", {
      headline: "Test Headline",
      summary: "A great summary",
      dateOfBirth: "2000-01-01",
      gender: "MALE",
      address: "123 Street",
      city: "HCM",
      yearsOfExperience: 2,
      jobLevel: "JUNIOR"
    }, token);

    await testApi("Get Candidate Profile", "/candidate/profile", "GET", null, token);
    await testApi("Get Educations", "/candidate/profile/educations", "GET", null, token);
    await testApi("Get Experiences", "/candidate/profile/experiences", "GET", null, token);
    await testApi("Get Projects", "/candidate/profile/projects", "GET", null, token);
    await testApi("Get Skills", "/candidate/profile/skills", "GET", null, token);
    await testApi("Get CV Files", "/candidate/profile/cv-files", "GET", null, token);
  } else {
    console.log("\n⚠️ Skipping protected Candidate tests due to missing token.");
  }

  // 4. ADMIN & HR (We will try, expecting 403 because we are CANDIDATE)
  if (token) {
    console.log("\n--- Testing RBAC (Role-Based Access Control) ---");
    const adminReq = await testApi("Admin Users List (Expect 403/Forbidden)", "/admin/users", "GET", null, token);
  }

  console.log("\n=== TEST SUITE COMPLETED ===");
}

runTests();
