import { getColorIterator } from "./utils/colors/color.js";
import sample from "./examples/widget00.js";

function widget(key, draw) {
    let nextColor = getColorIterator(key);

    // Dimensões da área de desenho
    const canvasWidth = 1000;
    const canvasHeight = 1000;

    // Posições centrais
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Posição central do astronauta
    const astronautCenterX = centerX;
    const astronautCenterY = centerY - 50;

    // Braço esquerdo movimento
    const leftArmAngle = (key.next4095() % 360) - 180;  // Movimenta entre -180 e 180 graus
    const rightArmAngle = (key.next256() % 360) - 180; // Movimenta entre -180 e 180 graus

    //Fundo
    draw.rect(canvasWidth, canvasHeight).move(0, 0).fill(nextColor()).opacity(0.5)
    draw.circle(canvasWidth + 10, canvasHeight + 10).move(-5, astronautCenterY + 210).fill("black")
    draw.circle(canvasWidth, canvasHeight).move(0, astronautCenterY + 215).fill(nextColor())

    // Mochila do astronauta
    draw.rect(75, 120).move(astronautCenterX - 65, astronautCenterY - 55).fill("black")
    draw.rect(70, 110).move(astronautCenterX - 60, astronautCenterY - 50).fill(nextColor()).opacity(0.8);

    // Corpo do astronauta
    draw.rect(90, 160).move(astronautCenterX - 45, astronautCenterY - 55).fill("black");
    draw.rect(80, 150).move(astronautCenterX - 40, astronautCenterY - 50).fill(nextColor());

    // Cabeça do astronauta
    draw.circle(90).move(astronautCenterX - 45, astronautCenterY - 135).fill("black");
    draw.circle(80).move(astronautCenterX - 40, astronautCenterY - 130).fill(nextColor());

    // Capacete do astronauta (visibilidade)
    draw.circle(60).move(astronautCenterX - 15, astronautCenterY - 120).fill('black').opacity(0.8);

    // Detalhes no capacete (antena)
    draw.line(astronautCenterX, astronautCenterY - 120, astronautCenterX, astronautCenterY - 150).stroke({ width: 2, color: nextColor() });
    draw.circle(10).move(astronautCenterX - 5, astronautCenterY - 160).fill(nextColor());

    // Perna esquerda
    draw.rect(40, 120).move(astronautCenterX - 45, astronautCenterY + 100).fill("black");
    draw.rect(30, 120).move(astronautCenterX - 40, astronautCenterY + 100).fill(nextColor());
    draw.rect(40, 35).move(astronautCenterX - 45, astronautCenterY + 220).fill("black");
    draw.rect(30, 30).move(astronautCenterX - 40, astronautCenterY + 220).fill(nextColor());

    // Perna direita
    draw.rect(40, 120).move(astronautCenterX + 5, astronautCenterY + 100).fill("black");
    draw.rect(30, 120).move(astronautCenterX + 10, astronautCenterY + 100).fill(nextColor());
    draw.rect(40, 35).move(astronautCenterX + 5, astronautCenterY + 220).fill("black");
    draw.rect(30, 30).move(astronautCenterX + 10, astronautCenterY + 220).fill(nextColor());

     // Ponto de rotação dos braços
     const leftShoulderX = astronautCenterX - 40;
     const leftShoulderY = astronautCenterY - 45;
     const rightShoulderX = astronautCenterX + 40;
     const rightShoulderY = astronautCenterY - 50;
 
     // Braço esquerdo
     const leftArmGroup = draw.group();
     leftArmGroup.rect(40, 100).move(leftShoulderX - 35, leftShoulderY - 5).fill("black");
     leftArmGroup.rect(40, 100).move(leftShoulderX - 35, leftShoulderY + 75).fill("black");
     leftArmGroup.rect(30, 100).move(leftShoulderX - 30, leftShoulderY).fill(nextColor());
     leftArmGroup.rect(30, 100).move(leftShoulderX - 30, leftShoulderY + 70).fill(nextColor());
     leftArmGroup.rotate(leftArmAngle, leftShoulderX, leftShoulderY);
 
     // Braço direito
     const rightArmGroup = draw.group();
     rightArmGroup.rect(40, 100).move(rightShoulderX - 5, rightShoulderY - 5).fill("black");    
     rightArmGroup.rect(30, 100).move(rightShoulderX, rightShoulderY).fill(nextColor());
     rightArmGroup.rect(40, 100).move(rightShoulderX - 5, rightShoulderY + 75).fill("black");    
     rightArmGroup.rect(30, 100).move(rightShoulderX, rightShoulderY + 70).fill(nextColor());
     rightArmGroup.rotate(rightArmAngle, rightShoulderX, rightShoulderY);

    // Desenho do exemplo (se necessário)
    // sample(key, draw);
}

export default widget;
