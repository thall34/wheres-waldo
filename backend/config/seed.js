const prisma = require('./db');

async function main() {
    // Clear existing data (optional)
    await prisma.foundCharacter.deleteMany();
    await prisma.game.deleteMany();
    await prisma.character.deleteMany();
    await prisma.map.deleteMany();

    // Create one map with three characters
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