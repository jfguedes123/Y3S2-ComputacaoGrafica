# CG 2022/2023

## Group T09G10

- Tomás Rebelo da Silva - 202108698
- João Filipe de Menezes Falcão e Sousa Guedes - 202108711

# Project 

## Panorama Images

Some difficulties with the panorama, figuring out the coordinates for the texture.

![Screenshot 1](screenshots/CG-t09g10-1.png)
![Screenshot 2](screenshots/CG-t09g10-1-b.png)

## Garden, Flowers and Randomness

We had difficulties in creating the "misaligned" stem, then found some other troubles with the textures (sometimes the objects would disappear).

![Screenshot 3](screenshots/CG-t09g10-2.png)

## Rocks and Rock sets

Our main difficulty was to not have empty sport in the rock due to the randomizing of the verices.

![Screenshot 4](screenshots/CG-t09g10-3.png)
![Screenshot 5](screenshots/CG-t09g10-3-b.png)

## Bee Model

Main difficulty was making the wings transparent.

![Screenshot 6](screenshots/CG-t09g10-4.png)

## Bee Movement

Main difficulty was to make it move, change its acceleration and angle.

![Screenshot 7](screenshots/CG-t09g10-5.png)
![Screenshot 8](screenshots/CG-t09g10-6.png)

## Shaders

We were able to implement the shaders, but we were unable to improve the performance. It is lagging, making the entire program slow and unusable. (The code for the shaders is currently commented.)

![Screenshot 9](screenshots/CG-t09g10-7.png)

# Further instructions

## Bee Movement

When trying to move the bee the user can use the A and D keys to change the direction of the bee and then click the W key to make it go forward, every time the W key is clicked the bee will gain speed. To make it stop the user just needs to press the S key once and the bee will stop.
To reset the bee to it's original position and direction the R key needs to be pressed.
If you want the bee to land in the nearest flower the F key needs to be pressed and the bee will lower it's height and move to the nearest flower. If that same flower has pollen in it there is the possibility to click the P key and the bee will pick up the pollen and move to it's original height. After arriving to that height you can press the O key to make the bee fly into its hive and leave the pollen. In the end you can press again the O key to make it go up again and try to go to another pollen flower.
Don't bump up the speed when picking up and delivering pollen as the bee might get a little disturbed by the extra weight. ;)

