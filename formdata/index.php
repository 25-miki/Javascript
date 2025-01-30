<?php
header('Content-Type: application/json'); // La respuesta será en formato JSON

// Verificar si los campos están presentes
if (!isset($_POST["nombre"]) || !isset($_POST["apellidos"]) || !isset($_FILES["avatar"])) {
    echo json_encode(["status" => "ko", "error" => "Faltan campos obligatorios"]);
    exit;
}

$nombre = $_POST["nombre"];
$apellidos = $_POST["apellidos"];
$avatar = $_FILES["avatar"];

// Verificar que el archivo es una imagen JPG o PNG
$extensionesPermitidas = ["jpg", "jpeg", "png"];
$extension = strtolower(pathinfo($avatar["name"], PATHINFO_EXTENSION));

if (!in_array($extension, $extensionesPermitidas)) {
    echo json_encode(["status" => "ko", "error" => "Formato de imagen no permitido"]);
    exit;
}

// Mover el archivo a una carpeta del servidor
$directorioDestino = "uploads/";
if (!file_exists($directorioDestino)) {
    mkdir($directorioDestino, 0777, true); // Crear la carpeta si no existe
}

$rutaArchivo = $directorioDestino . uniqid() . "." . $extension;
if (!move_uploaded_file($avatar["tmp_name"], $rutaArchivo)) {
    echo json_encode(["status" => "ko", "error" => "Error al guardar la imagen"]);
    exit;
}

// Si todo está bien, devolver una respuesta de éxito
echo json_encode(["status" => "ok"]);
?>
