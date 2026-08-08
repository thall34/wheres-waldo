const prisma = require('./db');

async function main() {
    // Clear existing data (optional)
    await prisma.foundCharacter.deleteMany();
    await prisma.game.deleteMany();
    await prisma.character.deleteMany();
    await prisma.map.deleteMany();

    // Create two maps with three characters each
    await prisma.map.create({
        data: {
            name: 'Waldo Beach',
            cloudinaryPath: 'https://res.cloudinary.com/desbleq8y/image/upload/v1782333081/waldo_ea1n4z.jpg',
            cloudinaryId: 'waldo_ea1n4z',
            characters: {
                create: [
                    {
                        name: 'wilma',
                        xLeft: 76.75,
                        xRight: 77.62,
                        yTop: 38.25,
                        yBottom: 40.5,
                    },
                    {
                        name: 'waldo',
                        xLeft: 60.98,
                        xRight: 62.93,
                        yTop: 34.75,
                        yBottom: 39.75,
                    },
                    {
                        name: 'wizard',
                        xLeft: 26.41,
                        xRight: 28.32,
                        yTop: 32.06,
                        yBottom: 36.5,
                    },
                ],
            },
            name: 'Waldo Racetrack',
            cloudinaryPath: 'https://res.cloudinary.com/desbleq8y/image/upload/v1786194121/racetrack_htbsic.jpg',
            cloudinaryId: 'racetrack_htbsic',
            characters: {
                create: [
                    {
                        name: 'wilma',
                        xLeft: 24.49,
                        xRight: 25.66,
                        yTop: 71.19,
                        yBottom: 75,
                    },
                    {
                        name: 'waldo',
                        xLeft: 26.91,
                        xRight: 29.73,
                        yTop: 31.81,
                        yBottom: 37.25,
                    },
                    {
                        name: 'wizard',
                        xLeft: 60.47,
                        xRight: 63,
                        yTop: 84.94,
                        yBottom: 92.19,
                    },
                ],
            },
        },
    });

    console.log("Database seeded successfully.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });