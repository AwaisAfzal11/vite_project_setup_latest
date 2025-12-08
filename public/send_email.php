<?php
// Set headers to allow cross-origin requests and define JSON content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle preflight OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // --- Get data from JSON payload ---
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if ($data === null) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON data."]);
        exit;
    }

    // --- Sanitize and retrieve form data ---
    $name = isset($data['name']) ? trim($data['name']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';
    $phone = isset($data['phone']) ? trim($data['phone']) : 'Not provided';
    $service = isset($data['service']) ? trim($data['service']) : 'Not selected';
    $package = isset($data['package']) && !empty($data['package']) ? trim($data['package']) : 'Not selected';
    $message = isset($data['message']) ? trim($data['message']) : '';

    // --- Validation ---
    if (empty($name) || empty($email) || empty($phone) || empty($service) || empty($message)) {
        echo json_encode(["status" => "error", "message" => "Please fill in all required fields (Name, Email, Phone, Message)."]);
        exit;
    }
    
    // Validate email before sanitizing
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email format."]);
        exit;
    }
    
    // Sanitize email after validation
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    
    // Sanitize other fields for email content
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $service = htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
    $package = htmlspecialchars($package, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    
    // --- Email Configuration ---
    // IMPORTANT: Update to Kaamlay's email address
    $to = "kaamlay.com@gmail.com"; 
    $subject = "New Website Inquiry from: " . $name;
    
    // Construct the email message
    $email_content = "You have received a new message from the website contact form.\n\n"
                   . "===========================================\n"
                   . " SENDER DETAILS\n"
                   . "===========================================\n"
                   . "Full Name:    {$name}\n"
                   . "Email:        {$email}\n"
                   . "Phone Number: {$phone}\n\n"
                   
                   . "===========================================\n"
                   . " INQUIRY DETAILS\n"
                   . "===========================================\n"
                   . "Service:      {$service}\n"
                   . "Package:      {$package}\n\n"

                   . "===========================================\n"
                   . " MESSAGE\n"
                   . "===========================================\n"
                   . "{$message}\n";
    
    // Set email headers
    $headers = "From: no-reply@kaamlay.com\r\n" .
               "Reply-To: {$email}\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
    // --- Send Email ---
    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(["status" => "success", "message" => "Thank you! Your message has been sent successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Server error: Failed to send email."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>