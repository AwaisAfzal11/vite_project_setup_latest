<?php
// CORS + Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }

// Only allow POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    exit;
}

/*
---------------------------------------------------------
  HANDLE MULTIPART FORM DATA (FILE + TEXT FIELDS)
---------------------------------------------------------
*/

$name     = isset($_POST['firstName']) ? trim($_POST['firstName']) . " " . trim($_POST['lastName']) : "";
$email    = isset($_POST['email']) ? trim($_POST['email']) : "";
$phone    = isset($_POST['phone']) ? trim($_POST['phone']) : "";
$service  = isset($_POST['service']) ? trim($_POST['service']) : "";
$message  = isset($_POST['message']) ? trim($_POST['message']) : "";

// File uploaded?
$uploadedFile = isset($_FILES['file']) ? $_FILES['file'] : null;

/*
---------------------------------------------------------
  VALIDATION (Same Logic You Used)
---------------------------------------------------------
*/
if (empty($name) || empty($email) || empty($phone) || empty($service) || empty($message)) {
    echo json_encode(["status" => "error", "message" => "Please fill in all required fields."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email address."]);
    exit;
}

// Sanitize after validation
$email   = filter_var($email, FILTER_SANITIZE_EMAIL);
$name    = htmlspecialchars($name);
$phone   = htmlspecialchars($phone);
$service = htmlspecialchars($service);
$message = htmlspecialchars($message);

/*
---------------------------------------------------------
  PREPARE EMAIL CONTENT
---------------------------------------------------------
*/

$to = "kaamlay.com@gmail.com";
$subject = "New Website Inquiry from: " . $name;

$emailBody =
"========== CONTACT DETAILS ==========\n" .
"Name: $name\n" .
"Email: $email\n" .
"Phone: $phone\n\n" .

"========== SERVICE ==========\n" .
"Service Selected: $service\n\n" .

"========== MESSAGE ==========\n$message\n\n";

/*
---------------------------------------------------------
  HANDLE FILE ATTACHMENT (IF EXISTS)
---------------------------------------------------------
*/

$boundary = md5(time());
$headers  = "From: no-reply@kaamlay.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";

if ($uploadedFile && $uploadedFile['error'] === UPLOAD_ERR_OK) {

    $fileName = $uploadedFile['name'];
    $fileData = file_get_contents($uploadedFile['tmp_name']);
    $fileData = chunk_split(base64_encode($fileData));

    // Email header for attachment
    $headers .= "Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";

    // Email body with attachment
    $body  = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $emailBody . "\r\n\r\n";

    $body .= "--$boundary\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"$fileName\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
    $body .= $fileData . "\r\n\r\n";
    $body .= "--$boundary--";

} else {
    // No file uploaded → normal email
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body = $emailBody;
}

/*
---------------------------------------------------------
  SEND EMAIL
---------------------------------------------------------
*/

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["status" => "success", "message" => "Thank you! Your message has been sent."]);
} else {
    echo json_encode(["status" => "error", "message" => "Server error: Email could not be sent."]);
}

?>
