<?php
// 1. HEADERS & CORS
// Allow React to communicate with this script
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle "Preflight" OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. CONFIGURATION (UPDATE THESE FOR EACH CLIENT)
$recipient = "afzalawais353@gmail.com"; // Where the leads go (Client Email)
$sender    = "no-reply@yourdomain.com"; // Authentication email (Must be from your server domain)

// 3. MAIN LOGIC
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // --- SPAM PROTECTION (HONEYPOT) ---
    // React sends this hidden field empty. Bots usually fill it.
    // If it has a value, we stop silently (pretend it worked).
    if (!empty($_POST['_honey'])) {
        echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
        exit;
    }

    // --- SANITIZE INPUTS ---
    $name    = htmlspecialchars(trim($_POST['fullName'] ?? ''));
    $email   = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // --- VALIDATION ---
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400); // Bad Request
        echo json_encode(["status" => "error", "message" => "Please complete all required fields correctly."]);
        exit;
    }

    // --- EMAIL CONSTRUCTION ---
    $subject = "New Contact from Website: " . $name;
    
    // Email Headers
    $headers = "From: $sender\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Email Body
    $emailBody = "You have received a new message from your website contact form.\n\n";
    $emailBody .= "Name: $name\n";
    $emailBody .= "Email: $email\n\n";
    $emailBody .= "Message:\n----------------\n$message\n----------------\n";

    // --- SENDING ---
    if (mail($recipient, $subject, $emailBody, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
    } else {
        http_response_code(500); // Server Error
        echo json_encode(["status" => "error", "message" => "Server error: Failed to send email."]);
    }

} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>