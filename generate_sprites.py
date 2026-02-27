from PIL import Image, ImageDraw

# spaceship sprite approximate
ship = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
d = ImageDraw.Draw(ship)
# manual pattern similar to attached design
pixels = [
    (15,0),(16,0),(14,1),(15,1),(16,1),(17,1),(13,2),(14,2),(15,2),(16,2),(17,2),(18,2),
    (12,3),(13,3),(14,3),(15,3),(16,3),(17,3),(18,3),(19,3),
    (11,4),(12,4),(13,4),(14,4),(15,4),(16,4),(17,4),(18,4),(19,4),(20,4),
    (10,5),(11,5),(12,5),(13,5),(14,5),(15,5),(16,5),(17,5),(18,5),(19,5),(20,5),(21,5)
]
for x,y in pixels:
    d.point((x,y), fill=(255,255,255,255))
# red highlights
reds=[(15,5),(16,5),(15,4),(16,4)]
for x,y in reds:
    d.point((x,y), fill=(255,0,0,255))
# blue eyes maybe
blues=[(14,3),(17,3)]
for x,y in blues:
    d.point((x,y), fill=(0,0,255,255))
ship.save('public/ship.png')

# alien sprite approximate red
alien = Image.new('RGBA', (64, 32), (0, 0, 0, 0))
d = ImageDraw.Draw(alien)
for x in range(8,56):
    for y in range(8,24):
        d.point((x,y), fill=(255,0,0,255))
alien.save('public/alien.png')

print('sprites generated')
