export const recoveryTemplate = ({userName,urlRecovery,companyName}) => (`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Recuperación de contraseña</title>
</head>
<body>
  <table cellpadding="0" cellspacing="0" style="width:100%;">
    <tr>
      <td>
        <table cellpadding="0" cellspacing="0" style="width:100%;background-color:#f7f7f7;">
          <tr>
            <td style="padding:20px;">
              <h2 style="text-align:center;">Recuperación de contraseña</h2>
              <p>Hola ${userName},</p>
              <p>Hemos recibido una solicitud para restablecer tu contraseña. Si no has solicitado este cambio, por favor ignora este correo electrónico.</p>
              <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
              <p style="text-align:center;"><a href="${urlRecovery}">Restablecer contraseña</a></p>
              <p>Si no puedes hacer clic en el enlace, copia y pega la siguiente URL en tu navegador:</p>
              <p style="text-align:center;">${urlRecovery}</p>
              <p>Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en ponerte en contacto con nosotros.</p>
              <p>Atentamente,<br>El equipo de ${companyName}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`)