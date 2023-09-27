# Define the base URL of your API
$baseUrl = "http://localhost:3000"  # Replace with your actual API URL

# Define token variables at the global scope
$adminToken = $null
$managerToken = $null
$userToken = $null

# Function to test admin login
function Test-AdminLogin {
    It "POST admin/login should login an admin" {
        # Replace with valid admin credentials
        $body = @{
            admin_email = "admin-user@gmail.com"
            admin_password = "admin-user"
        }
        $response = Invoke-RestMethod -Uri ($baseUrl + "/api/users/admin/login") -Method Post -Body $body
        $response.success | Should -Be $true
        $response.message | Should -Be "Successfully logged in as admin"
        $adminToken = $response.token  # Set the global adminToken variable
    }
}

# Function to test manager login
function Test-ManagerLogin {
    It "POST /api/users/manager/login should login a manager" {
        # Replace with valid manager credentials
        $body = @{
            manager_email = "manager@gmail.com"
            manager_password = "manager"
        }
        $response = Invoke-RestMethod -Uri ($baseUrl + "/api/users/manager/login") -Method Post -Body $body
        $response.success | Should -Be $true
        $response.message | Should -Be "Successfully logged in as manager"
        $managerToken = $response.token  # Set the global managerToken variable
    }
}

# Function to test user login
function Test-UserLogin {
    It "POST /api/users/user/login should login a user" {
        # Replace with valid user credentials
        $body = @{
            user_email = "test-user@gmail.com"
            user_password = "test-user"
        }
        $response = Invoke-RestMethod -Uri ($baseUrl + "/api/users/user/login") -Method Post -Body $body
        $response.success | Should -Be $true
        $response.message | Should -Be "Successfully logged in as user"
        $userToken = $response.token  # Set the global userToken variable
    }
}

# Function to test user updates
function Test-UserUpdates {
    It "PUT /api/users/user/{user_id} should update user information" {
        # Replace with valid user update data and user_id
        $body = @{
            user_name = "NewUserName"
            # Add other fields to update
        }
        $userId = "64ef81e44520028b5a29b73c"  # Replace with a valid user ID

        # Add authentication with user's token
        $headers = @{
            Authorization = "Bearer $userToken"
        }

        $response = Invoke-RestMethod -Uri ($baseUrl + "/api/users/user/$userId") -Method Put -Body $body -Headers $headers
        $response.success | Should -Be $true
        $response.message | Should -Be "User information updated"
    }
}

# Function to test manager updates user
function Test-ManagerUpdatesUser {
    It "PUT /api/users/user/{user_id} should allow manager to update user" {
        # Replace with valid user update data and user_id
        $body = @{
            user_name = "NewUserNameByManager"
            # Add other fields to update
        }
        $userId = "64ef81e44520028b5a29b73c"  # Replace with a valid user ID

        # Add authentication with manager's token
        $headers = @{
            Authorization = "Bearer $managerToken"
        }

        $response = Invoke-RestMethod -Uri ($baseUrl + "/api/users/user/$userId") -Method Put -Body $body -Headers $headers
        $response.success | Should -Be $true
        $response.message | Should -Be "User information updated by manager"
    }
}

# Function to test admin updates user
function Test-AdminUpdatesUser {
    It "PUT /api/users/user/{user_id} should allow admin to update user" {
        # Replace with valid user update data and user_id
        $body = @{
            user_name = "NewUserNameByAdmin"
            # Add other fields to update
        }
        $userId = "64ef81e44520028b5a29b73c"  # Replace with a valid user ID

        # Add authentication with admin's token
        $headers = @{
            Authorization = "Bearer $adminToken"
        }

        $response = Invoke-RestMethod -Uri ($baseUrl + "/api/users/user/$userId") -Method Put -Body $body -Headers $headers
        $response.success | Should -Be $true
        $response.message | Should -Be "User information updated by admin"
    }
}


# Run the tests for each user role
Describe "Admin Routes" {
    Test-AdminLogin
    Test-AdminUpdatesUser
}

Describe "Manager Routes" {
    Test-ManagerLogin
    Test-ManagerUpdatesUser
}

Describe "User Routes" {
    Test-UserLogin
    Test-UserUpdates
}
