const {
  Sighting,
  Certification
} = require('../server/db/models')

const DiveShopsData = [
  {name: "Big Blue Explorer", location: "Palawan, Philippines", email: "bbe@email.com", storeFrontImgUrl: "BigBlueExplorer.jpg"},
  {name: "Aqua Scuba Center", location: "Belize, C.A.", email: "acb@email.com", storeFrontImgUrl: "AquaScubaCenter.jpeg"},
  {name: "Centurion Cruises", location: "Yongala, Australia", email: "cc@email.com", storeFrontImgUrl: "CenturionCruises.jpg"},
  {name: "Sea Serpent", location: "Sharm El Sheikh, Egypt", email: "ss@email.com", storeFrontImgUrl: "SeaSerpent.jpg"},
  {name: "Kona Honu Divers", location: "Honolulu, Hawaii", email: "khu@email.com", storeFrontImgUrl: "KonaHonuDivers.jpg"},
  {name: "Ocean King", location: "Bali, Indonesia", email: "oc@email.com", storeFrontImgUrl: "OceanKing.png"},
  {name: "Eco Dive Center", location: "Culver City, California", email: "edc@email.com", storeFrontImgUrl: "EcoDiveCenter.png"},
  {name: "Florida Keys Dive Center", location: "Florida Keys, Florida", email: "fkdc@email.com", storeFrontImgUrl: "FloridaKeysDiveCenter.png"},
  {name: "Adventure Scuba", location: "New York NY", email: "as@email.com", storeFrontImgUrl: "AdventureScuba.jpg"},
]

const OfferedDivesData =[
  {	id: 1, 	name: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	description: "Sipadan is a world-class destination, long attracting divers from around the world. Barracuda Point is one of the standout dive sites among many.", 	diveshopId: 1, 	imageURL: "BarracudaPoint.jpg"	},
  {	id: 2, 	name: "Blue Corner Wall", 	location: "Palau, Micronesia", 	description: "Blue Corner Palau is one of the most action-packed scuba dive sites in the world and up to 13 different species of sharks circling just beyond the plummeting reef wall.", 	diveshopId: 1, 	imageURL: "BlueCornerWall.jpg"	},
  {	id: 3, 	name: "The Great Blue Hole", 	location: "Belize City, Belize", 	description: "The Great Blue Hole is a giant marine sinkhole off the coast of Belize. It lies near the center of Lighthouse Reef.", 	diveshopId: 2, 	imageURL: "TheGreatBlueHole.jpg"	},
  {	id: 4, 	name: "Yongala", 	location: "Yongala, Australia", 	description: "The Yongala is a shipwreck in Queensland. She sank during a cyclone in 1911 killing 122 people, a racehorse called Moonshine and a red Lincolnshire bull.", 	diveshopId: 3, 	imageURL: "Yongala.jpeg"	},
  {	id: 5, 	name: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	description: "Thistlegorm is Gaelic for Blue Thistle. A British vessel, it was attacked from the air and sunk in 1941 whilst carrying a cargo of war supplies: rifles, motor bikes, train carriages, trucks. A big wreck - 131 metres long.", 	diveshopId: 4, 	imageURL: "Thistlegorm.jpg"	},
  {	id: 6, 	name: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	description: "Shark and Yolanda Reef which offers spectacular coral, bizarre fauna and a great selection of fish that included several huge moray eels, a couple of crocodile fish, several pairs of lion fish and our first ever sighting of a rare scorpion fish which is a magnificent pink, yellow and turquoise, plus a couple of huge turtles.", 	diveshopId: 4, 	imageURL: "SharkAndYolandaReefs.jpg"	},
  {	id: 7, 	name: "Kormoran", 	location: "Ras Mohammed, Egypt", 	description: "One of the best dives (that we did around Tiran Island) was probably the shallowest, to the wreck of the Kormoran. Located north of Tiran Island, the twisted structure of this large container ship is only six to eight metres below the surface and is surrounded by prolific coral that has been stained by the ship's cargo of phosphorous.", 	diveshopId: 4, 	imageURL: "Kormoran.jpg"	},
  {	id: 8, 	name: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	description: "Night time Manta dive gives you a look at an absolute ballet of a menagerie of fish along with some of the largest mantas ever seen.", 	diveshopId: 5, 	imageURL: "MantaRayNightDive.jpg"	},
  {	id: 9, 	name: "Navy Pier", 	location: "Navy Pier, Western Australia", 	description: "Amazing diversity of fish life, in a small area. On a good visibility day simply too much to absorb", 	diveshopId: 3, 	imageURL: "NavyPier.jpg"	},
  {	id: 10, 	name: "Liberty", 	location: "Bali, Indonesia", 	description: "The Liberty lies on a black sand slope almost parallel to the beach. It is just 30 metres from the shore. This dive site is suitable for all levels of qualification and experience.", 	diveshopId: 6, 	imageURL: "Liberty.jpg"	},
  {	id: 11, 	name: "The Coral Garden", 	location: "Bali, Indonesia", 	description: "Running along the middle section of Tulamben beach is a shallow reef of mainly table and fire corals interspersed with anemones as well as barrel and other sponges.", 	diveshopId: 6, 	imageURL: "TheCoralGarden.jpg"	},
  {	id: 12, 	name: "Palawan", 	location: "Palawan, Philippines", 	description: "The Philippines is an archipelago of over 7100 islands. It is part of the Coral Triangle, in which live 76% of the world's coral species, 6 of the world's 7 marine turtle species and at least 2,228 reef fish species.", 	diveshopId: 1, 	imageURL: "Palawan.jpg"	},
  {	id: 13, 	name: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	description: "", 	diveshopId: 2, 	imageURL: "DarwinArch.jpg"	},
  {	id: 14, 	name: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	description: "Magnificent wall dive with unlimited visibility open to the Pacific. Lots of Pelagics: 14 ft blue shark, reef, coral, colour.", 	diveshopId: 5, 	imageURL: "MolokiniCraterWall.jpg"	},
  {	id: 15, 	name: "Verde Islands", 	location: "Verde Island, Philippines", 	description: "World class diving, the Best and biggest coral gardens with huge shoals of colourful fishes.", 	diveshopId: 1, 	imageURL: "VerdeIslands.jpg"	},
  {	id: 16, 	name: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	description: "This pristine area, particularly Whaler’s Cover and Bluefish Cove, allows no more than 30 divers per day, so advance online reservations are necessary.", 	diveshopId: 7, 	imageURL: "MontereyBayNationalMarineSanctuary.jpg"	},
  {	id: 17, 	name: "Ship Rock", 	location: "Santa Catalina Island, California", 	description: "", 	diveshopId: 7, 	imageURL: "ShipRock.jpg"	},
  {	id: 18, 	name: "Channel Islands National Park", 	location: "Channel Islands National Park", 	description: "", 	diveshopId: 7, 	imageURL: "ChannelIslandsNationalPark.jpg"	},
  {	id: 19, 	name: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	description: "The ship spent 12 years tethered in the Navy’s “Mothball Fleet” in Virginia’s James River. In June 2001, it was towed to undergo an elaborate cleaning process and 11 months later was relocated off Key Largo.", 	diveshopId: 8, 	imageURL: "USSSpiegelGrove.jpg"	},
  {	id: 20, 	name: "Wreck Valley", 	location: "New York, NY", 	description: "If you think you can't scuba dive off New York and New Jersey, you are mistaken. There ARE HUNDREDS of shipwrecks.", 	diveshopId: 9, 	imageURL: "WreckValley.jpg"	},
  {	id: 21, 	name: "Bloody Bay Wall", 	location: "Little Cayman, Cayman Islands", 	description: "", 	diveshopId: 2, 	imageURL: "BloodyBayWall.jpg"	},]

  const ObservationOddsByOfferedDiveData = [
  {	offereddiveId: 1, 	Guaranteed: "Barracuda, White Tip Shark, Black Tip Shark, Acroporids",	Common: "Stonefish, Cuttlefish, Nudibranch, Whip Coral, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 2, 	Guaranteed: "Dolphin, Manta Ray, Hammerhead Shark, Reef Shark",	Common: "White Tip Shark, Black Tip Shark, Nurse Shark, Leopard Shark, Octopus, Barracuda, Lobster",	Uncommon: "Jack, Snapper, Tang, Parrot Fish, Coral, Anemone, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 3, 	Guaranteed: "The Great Blue Hole, Reef Shark, Nudibranch",	Common: "Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 4, 	Guaranteed: "Yongala",	Common: "Manta Ray, Sea Snake, Octopus, Turtle, Bull Shark, Tiger Shark, Acroporids, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Lion Fish, Scorpion Fish, Stargazer, Whip Coral, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 5, 	Guaranteed: "Thistlegorm, Nudibranch, Coral",	Common: "Acroporids, Moray Eel, Scorpion Fish, Crocodile Fish, Lion Fish, Turtle, Barracuda, Tiger Shark",	Uncommon: "Shipwreck",	Rare: "Treasure",	Legendary: "New Yorker, Fullstack Academy Alum"	},
  {	offereddiveId: 6, 	Guaranteed: "Coral, Yongala",	Common: "Acroporids, Moray Eel, Scorpion Fish, Crocodile Fish, Lion Fish, Turtle, Barracuda, Tiger Shark",	Uncommon: "Shipwreck",	Rare: "Treasure",	Legendary: "New Yorker, Fullstack Academy Alum"	},
  {	offereddiveId: 7, 	Guaranteed: "Pocilloporids, Kormoran, Coral",	Common: "Acroporids, Moray Eel, Scorpion Fish, Crocodile Fish, Lion Fish, Turtle, Barracuda, Tiger Shark",	Uncommon: "Shipwreck",	Rare: "Treasure",	Legendary: "New Yorker, Fullstack Academy Alum"	},
  {	offereddiveId: 8, 	Guaranteed: "Manta Ray",	Common: "Whip Coral, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Reef Shark, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 9, 	Guaranteed: "Nudibranch, Flatworm, Moray Eel",	Common: "Woebegone, White Tip Shark, Octopus, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Lion Fish, Scorpion Fish, Stargazer, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 10, 	Guaranteed: "USS Liberty, Anemone, Gorgonian, Acroporids",	Common: "Octopus, Reef Shark, Spanish Dancers, Flashlight Fish, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Batfish, Stonefish, Cuttlefish, Nudibranch, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 11, 	Guaranteed: "Fire Coral, Barrel Sponge, Anemone, Blue Ribbon Eel",	Common: "Octopus, Reef Shark, Spanish Dancers, Flashlight Fish, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 12, 	Guaranteed: "Tubbataha Reef",	Common: "Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Orca, Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 13, 	Guaranteed: "Hammerhead Shark, Batfish",	Common: "Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Orca, Mobula, Whale Shark, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 14, 	Guaranteed: "Volcano",	Common: "Moray Eel, Goat Fish, Emperor Fish, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Wrasse, Hawk Fish, Manta Ray, Humpback Seal, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 15, 	Guaranteed: "White Tip Shark, Pocilloporids, Shipwreck",	Common: "Blue Shark, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 16, 	Guaranteed: "Harbor Seal",	Common: "Abalone, Rock Cod, Leopard Shark, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 17, 	Guaranteed: "Shipwreck",	Common: "Sun Fish, Garibaldi, Sheepshead, Rock Cod, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Octopus, Leopard Shark, Angel Shark, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 18, 	Guaranteed: "Giant Sea Bass, Black Sea Bass",	Common: "Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 19, 	Guaranteed: "USS Spiegel Grove, Nudibranch, Barracuda",	Common: "Shipwreck, Manta Ray, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Crocodile, Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 20, 	Guaranteed: "New Yorker, Shipwreck",	Common: "Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
  {	offereddiveId: 21, 	Guaranteed: "Turtle",	Common: "Manta Ray, Nudibranch, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},]

const ObservationsData = [
  {	id: 1, 	name: "Whale Shark", 	category: "fish"	, description: "Slow-moving, filter-feeding carpet shark. the biggest fish in the sea!", 	},
  {	id: 2, 	name: "Nudibranch", 	category: "mollusks"	, description: "Sea slug. Lives on coral. Can grow to 4 inches.", 	},
  {	id: 3, 	name: "Psychedelic Frogfish", 	category: "fish"	, description: "Small, short, stocky, and masters of camoflage", 	},
  {	id: 4, 	name: "Seahorse", 	category: "fish"	, description: "Lives exclusively on coral. Masters of camoflage", 	},
  {	id: 5, 	name: "Manta Ray", 	category: "fish"	, description: "Majestic creatures with a wingspan of 23 feet", 	},
  {	id: 6, 	name: "Reef Shark", 	category: "fish"	, description: "Shark! Scary!", 	},
  {	id: 7, 	name: "Moray Eel", 	category: "fish"	, description: "Mostly seen in brackish water.", 	},
  {	id: 8, 	name: "Cuttlefish", 	category: "mollusks"	, description: "Shape-shifting, color-changing, beast", 	},
  {	id: 9, 	name: "Barrel Sponge", 	category: "sponges"	, description: "Barrel-shaped sponge", 	},
  {	id: 10, 	name: "Shipwreck", 	category: "inanimate objects"	, description: "Shipwreck. Wonders of the sea", 	},
  {	id: 11, 	name: "White Tip Shark", 	category: "fish"	, description: "A large pelagic requiem shark inhabiting tropical and warm temperate seas", 	},
  {	id: 12, 	name: "Black Tip Shark", 	category: "fish"	, description: "A special of the requiem shark, and part of thefamily Carcharhinidae", 	},
  {	id: 13, 	name: "Barracuda", 	category: "fish"	, description: "A ray-finned fish known for its large size, fearsome appearance and ferocious behaviour", 	},
  {	id: 14, 	name: "Fusilier", 	category: "fish"	, description: "A colourful perciform fish. They are mostly associated with snapper.", 	},
  {	id: 15, 	name: "Batfish", 	category: "fish"	, description: "An bizarre creature endemic to the reefs surrounding Galapagos, the Red-lipped Batfish walks instead of swims and looks as though it is wearing lipstick.", 	},
  {	id: 16, 	name: "Stonefish", 	category: "fish"	, description: "Not as hard as I thought!", 	},
  {	id: 17, 	name: "Dolphin", 	category: "mammals"	, description: "Most intelligent marvels of the sea", 	},
  {	id: 18, 	name: "Hammerhead Shark", 	category: "fish"	, description: "Hammerhead sharks are known to eat a large range of prey such as fish (including other sharks), squid, octopus, and crustaceans. Stingrays are a particular favorite.", 	},
  {	id: 19, 	name: "Nurse Shark", 	category: "fish"	, description: "I mean if this shark can heal you…", 	},
  {	id: 20, 	name: "Leopard Shark", 	category: "fish"	, description: "Leopard sharks eat crabs, fish eggs, clam siphons, and burrowing worm species. As they grow older, they eat more fish. ", 	},
  {	id: 21, 	name: "Octopus", 	category: "mollusks"	, description: "The octopus is a soft-bodied, eight-limbed mollusc of the order Octopoda. Around 300 species are recognised, and the order is grouped within the class Cephalopoda with squids, cuttlefish, and nautiloids.", 	},
  {	id: 22, 	name: "Lobster", 	category: "mollusks"	, description: "Lobsters are invertebrates with a hard protective exoskeleton. Lobsters must moult to grow, which leaves them vulnerable. Lobsters have eight walking legs; the front three pairs bear claws, the first of which are larger than the others.", 	},
  {	id: 23, 	name: "The Great Blue Hole", 	category: "inanimate objects"	, description: "Exploring the World's Largest Sinkhole", 	},
  {	id: 24, 	name: "Sea Snake", 	category: "fish"	, description: "Sea snakes, or coral reef snakes, are a subfamily of venomous elapid snakes, the Hydrophiinae, that inhabit marine environments for most or all of their lives.", 	},
  {	id: 25, 	name: "Whip Coral", 	category: "coral"	, description: "Vine-shaped coral", 	},
  {	id: 26, 	name: "Bull Shark", 	category: "fish"	, description: "Bull sharks are the most dangerous sharks in the world, according to many experts.", 	},
  {	id: 27, 	name: "Tiger Shark", 	category: "fish"	, description: "The tiger shark is a solitary, mostly nocturnal hunter. It is notable for having the widest food spectrum of all sharks, with a range of prey that includes crustaceans, fish, seals, birds, squid, turtles, sea snakes, dolphins, and even other smaller sharks.", 	},
  {	id: 28, 	name: "Scorpion Fish", 	category: "fish"	, description: "A scorpion fish is a group of predatory, marine fish that are found amongst coral reefs and in shallow waters in the more temperate oceans.", 	},
  {	id: 29, 	name: "Crocodile Fish", 	category: "fish"	, description: "De Beaufort's flathead", 	},
  {	id: 30, 	name: "Crocodile", 	category: "other living things"	, description: "Don't go near this beast", 	},
  {	id: 31, 	name: "Lion Fish", 	category: "fish"	, description: "The lionfish is a carnivorous fish native to the Indo-Pacific that is now an invasive species in the Atlantic.", 	},
  {	id: 32, 	name: "Flatworm", 	category: "other living things"	, description: "So flat, yu can't see them!", 	},
  {	id: 33, 	name: "Woebegone", 	category: "coral"	, description: "Woeeeee1!!!!!!", 	},
  {	id: 34, 	name: "Stargazer", 	category: "fish"	, description: "If you find youself gazing at this creature, you dived deep", 	},
  {	id: 35, 	name: "Anemone", 	category: "mollusks"	, description: "Enomena ~ duh duh, duh duh duh", 	},
  {	id: 36, 	name: "Gorgonian", 	category: "coral"	, description: "Oooooh Pretty", 	},
  {	id: 37, 	name: "Fire Coral", 	category: "coral"	, description: "Oooooh Glamorous!", 	},
  {	id: 38, 	name: "Blue Ribbon Eel", 	category: "fish"	, description: "Beware, this can follow you on land", 	},
  {	id: 39, 	name: "Parrot Fish", 	category: "fish"	, description: "If only this fish would echo our sentences", 	},
  {	id: 40, 	name: "Spanish Dancers", 	category: "mollusks"	, description: "Red with Passion!", 	},
  {	id: 41, 	name: "Flashlight Fish", 	category: "fish"	, description: "This is, luckily, not the Angler fish. You can still see the light!", 	},
  {	id: 42, 	name: "Thresher Shark", 	category: "fish"	, description: "FOR MOST SHARKS, the front end is the dangerous bit. Thresher sharks are the exception. They’re deadly at both ends, because they’ve managed to weaponise their tails.", 	},
  {	id: 43, 	name: "Orca", 	category: "mammals"	, description: "Mega!", 	},
  {	id: 44, 	name: "Mobula", 	category: "mammals"	, description: "Super Mega!", 	},
  {	id: 45, 	name: "Tubbataha Reef", 	category: "coral"	, description: "Perlas nang silanganan!", 	},
  {	id: 46, 	name: "Volcano", 	category: "inanimate objects"	, description: "Inactive I hope", 	},
  {	id: 47, 	name: "Jack", 	category: "fish"	, description: "Jackfish are a large family of sleek predators, native to warm and temperate waters around the world. ", 	},
  {	id: 48, 	name: "Snapper", 	category: "fish"	, description: "Hundreds of snapper species exist, named after their snapping teeth. ", 	},
  {	id: 49, 	name: "Goat Fish", 	category: "fish"	, description: "baaaaaah", 	},
  {	id: 50, 	name: "Emperor Fish", 	category: "fish"	, description: "Lutjanus sebae, the emperor red snapper, is an inhabitant of both rocky and coral reefs, preferring flat areas with either a sandy or gravel substrate.", 	},
  {	id: 51, 	name: "Wrasse", 	category: "fish"	, description: "They are some of the most colorful of the moderately-sized saltwater", 	},
  {	id: 52, 	name: "Tang", 	category: "fish"	, description: "DORY!!!!!", 	},
  {	id: 53, 	name: "Butterfly Fish", 	category: "fish"	, description: "The butterfly fish is a generally small-sized species of marine fish, found in tropical and subtropical waters, primarily around coral reefs. The butterfly fish is well known for its brightly coloured body and elaborate markings.", 	},
  {	id: 54, 	name: "Hawk Fish", 	category: "fish"	, description: "Most Hawkfish reach a size of three inches and are hardy specimens that adjust well to aquarium life. ", 	},
  {	id: 55, 	name: "Humpback Seal", 	category: "mammals"	, description: "Acrobats of the sea", 	},
  {	id: 56, 	name: "Blue Shark", 	category: "fish"	, description: "The blue shark is a curious, open-ocean predator that lives throughout the global ocean, from the tropics to cold temperate waters.", 	},
  {	id: 57, 	name: "Pocilloporids", 	category: "coral"	, description: "The Pocilloporidae are a family of stony corals in the order Scleractinia occurring in the Pacific and Indian Oceans.", 	},
  {	id: 58, 	name: "Acroporids", 	category: "coral"	, description: "Corals are actually colonies of many tiny invertebrate animals called polyps, which together form a hard calcium carbonate skeleton.", 	},
  {	id: 59, 	name: "Harbor Seal", 	category: "mammals"	, description: "If you see this as a baby, you will want to adopt one UwU", 	},
  {	id: 60, 	name: "Abalone", 	category: "mollusks"	, description: "Abalone (from Spanish Abulón) are shellfish, a genus of gastropods. Abalone are known by their colorful pearlescent inside shell.", 	},
  {	id: 61, 	name: "Rock Cod", 	category: "fish"	, description: "Pacific rockfish—also known as rock cod or Pacific snapper—is a very versatile fish. ", 	},
  {	id: 62, 	name: "Garibaldi", 	category: "fish"	, description: "Garibaldis are a great fish—really cool, very personable, but very aggressive", 	},
  {	id: 63, 	name: "Sheepshead", 	category: "fish"	, description: "baaaaaah", 	},
  {	id: 64, 	name: "Angel Shark", 	category: "fish"	, description: "A shark that looks like a Ray - Heaven meets Hell", 	},
  {	id: 65, 	name: "Sun Fish", 	category: "fish"	, description: "Sunfish, or mola, develop their truncated, bullet-like shape because the back fin which they are born with simply never grows.", 	},
  {	id: 66, 	name: "Giant Sea Bass", 	category: "fish"	, description: "Giant sea bass can live at least 70 years, grow to 7 feet in length and weigh up to 560 pounds.", 	},
  {	id: 67, 	name: "Black Sea Bass", 	category: "fish"	, description: "Moat descriptions are food related. Good luck, friends!", 	},
  {	id: 68, 	name: "New Yorker", 	category: "mammals"	, description: "(prop n.) 1. A resident of New York. 2. Someone who can speak Profanese. 3. A damned ornery person.", 	},
  {	id: 69, 	name: "Coral", 	category: "coral"	, description: "Fascinating looking coral", 	},
  {	id: 70, 	name: "USS Spiegel Grove", 	category: "inanimate objects"	, description: "The breathtakingly enormous Spiegel Grove — nearly two football fields long — is the “grande dame” of Key Largo wrecks. ", 	},
  {	id: 71, 	name: "Jellyfish", 	category: "other living things"	, description: "Jumping Jellyfish…", 	},
  {	id: 72, 	name: "Clown Fish", 	category: "fish"	, description: "NEMO!!", 	},
  {	id: 73, 	name: "Whale", 	category: "mammals"	, description: "You may spot a few hazy puffs and say “I guess that's a whale,” or you could find yourself face-to-blowhole with a colossal marine mammal in a majestic, life affirming experience.", 	},
  {	id: 74, 	name: "Treasure", 	category: "inanimate objects"	, description: "$$$", 	},
  {	id: 75, 	name: "Fullstack Academy Alum", 	category: "mammals"	, description: "Class of 1902!!", 	},
  {	id: 76, 	name: "USS Liberty", 	category: "inanimate objects"	, description: "Shipwreck. Wonders of the sea", 	},
  {	id: 77, 	name: "Kormoran", 	category: "inanimate objects"	, description: "Shipwreck. Wonders of the sea", 	},
  {	id: 78, 	name: "Yongala", 	category: "inanimate objects"	, description: "Shipwreck. Wonders of the sea", 	},
  {	id: 79, 	name: "Thistlegorm", 	category: "inanimate objects"	, description: "Shipwreck. Wonders of the sea", 	},
  {	id: 80, 	name: "Turtle", 	category: "other living things"	, description: "This guy probably lived longer than my grandpa", 	},
  {	id: 81, 	name: "Tuna", 	category: "fish"	, description: "Quite big for a fish", 	}
]

const DiversData = [
  {	id: 1, 	firstName: "Cody", 	lastName: "De Coder", 	email: "cody@email.com", 	password: "123", 	height: 185, 	weight: 79, 	diveshopId: 1	},
  {	id: 2, 	firstName: "Murphy", 	lastName: "Law", 	email: "murphy@email.com", 	password: "123", 	height: 182, 	weight: 62, 	diveshopId: null	},
  {	id: 3, 	firstName: "William", 	lastName: "Tanner", 	email: "AnitaTan@email.com", 	password: "123", 	height: 171, 	weight: 73, 	diveshopId: null	},
  {	id: 4, 	firstName: "Grace", 	lastName: "Shopper", 	email: "gs@fsa.com", 	password: "123", 	height: 182, 	weight: 71, 	diveshopId: null	},
  {	id: 5, 	firstName: "Navin", 	lastName: "Donohue", 	email: "Navin.Donohue@email.com", 	password: "123", 	height: 179, 	weight: 74, 	diveshopId: null	},
  {	id: 6, 	firstName: "Esther", 	lastName: "Mullane", 	email: "Esther.Mullane@email.com", 	password: "123", 	height: 168, 	weight: 59, 	diveshopId: null	},
  {	id: 7, 	firstName: "Ximun", 	lastName: "Nuddi", 	email: "Ximun.Nuddi@email.com", 	password: "123", 	height: 175, 	weight: 65, 	diveshopId: null	},
  {	id: 8, 	firstName: "Agnete", 	lastName: "Steensen", 	email: "Agnete.Steensen@email.com", 	password: "123", 	height: 187, 	weight: 69, 	diveshopId: null	},
  {	id: 9, 	firstName: "Zosimus", 	lastName: "Faucher", 	email: "Zosimus.Faucher@email.com", 	password: "123", 	height: 179, 	weight: 68, 	diveshopId: null	},
  {	id: 10, 	firstName: "Raphaela", 	lastName: "Noyer", 	email: "Raphaela.Noyer@email.com", 	password: "123", 	height: 169, 	weight: 57, 	diveshopId: null	},
  {	id: 11, 	firstName: "Herman", 	lastName: "Barwegen", 	email: "Herman.Barwegen@email.com", 	password: "123", 	height: 162, 	weight: 57, 	diveshopId: null	},
  {	id: 12, 	firstName: "Severina", 	lastName: "Constable", 	email: "Severina.Constable@email.com", 	password: "123", 	height: 155, 	weight: 62, 	diveshopId: null	},
  {	id: 13, 	firstName: "Murdag", 	lastName: "Queen", 	email: "Murdag.Queen@email.com", 	password: "123", 	height: 166, 	weight: 64, 	diveshopId: null	},
  {	id: 14, 	firstName: "Rubye", 	lastName: "Jeffers", 	email: "Rubye.Jeffers@email.com", 	password: "123", 	height: 177, 	weight: 67, 	diveshopId: 3	},
  {	id: 15, 	firstName: "Cathryn", 	lastName: "Danniell", 	email: "Cathryn.Danniell@email.com", 	password: "123", 	height: 167, 	weight: 65, 	diveshopId: 2	},
  {	id: 16, 	firstName: "Jam", 	lastName: "Superman", 	email: "Jam.Superman@email.com", 	password: "123", 	height: 174, 	weight: 64, 	diveshopId: null	},
  {	id: 17, 	firstName: "Vincent", 	lastName: "Price", 	email: "Vincent.Price@email.com", 	password: "123", 	height: 178, 	weight: 62, 	diveshopId: null	},
  {	id: 18, 	firstName: "Czan", 	lastName: "Czavier", 	email: "Czan.Czavier@email.com", 	password: "123", 	height: 155, 	weight: 51, 	diveshopId: 9	},
  {	id: 19, 	firstName: "Jojo", 	lastName: "Bizzare", 	email: "Jojo.Bizzare@email.com", 	password: "123", 	height: 170, 	weight: 65, 	diveshopId: 4	},
  {	id: 20, 	firstName: "Dio", 	lastName: "Brando", 	email: "Dio.Brando@email.com", 	password: "123", 	height: 175, 	weight: 67, 	diveshopId: 6	},
]

const Dice = function(data) {
  let seen = []
  data.Guaranteed.split(', ').reduce((acc, elem) => {
    acc.push(elem)
    return acc
  },seen)
  data.Common.split(', ').reduce((acc, elem) => {
    if(Math.random() > 0.5)
    acc.push(elem)
    return acc
  },seen)
  data.Uncommon.split(', ').reduce((acc, elem) => {
    if(Math.random() > 0.85)
    acc.push(elem)
    return acc
  },seen)
  data.Rare.split(', ').reduce((acc, elem) => {
    if(Math.random() > 0.96)
    acc.push(elem)
    return acc
  },seen)
  data.Legendary.split(', ').reduce((acc, elem) => {
    if(Math.random() > 0.995)
    acc.push(elem)
    return acc
  },seen)
  return seen
}

const ObservationHash = {	"Whale Shark"	:	1	,
"Nudibranch"	:	2	,
"Psychedelic Frogfish"	:	3	,
"Seahorse"	:	4	,
"Manta Ray"	:	5	,
"Reef Shark"	:	6	,
"Moray Eel"	:	7	,
"Cuttlefish"	:	8	,
"Barrel Sponge"	:	9	,
"Shipwreck"	:	10	,
"White Tip Shark"	:	11	,
"Black Tip Shark"	:	12	,
"Barracuda"	:	13	,
"Fusilier"	:	14	,
"Batfish"	:	15	,
"Stonefish"	:	16	,
"Dolphin"	:	17	,
"Hammerhead Shark"	:	18	,
"Nurse Shark"	:	19	,
"Leopard Shark"	:	20	,
"Octopus"	:	21	,
"Lobster"	:	22	,
"The Great Blue Hole"	:	23	,
"Sea Snake"	:	24	,
"Whip Coral"	:	25	,
"Bull Shark"	:	26	,
"Tiger Shark"	:	27	,
"Scorpion Fish"	:	28	,
"Crocodile Fish"	:	29	,
"Crocodile"	:	30	,
"Lion Fish"	:	31	,
"Flatworm"	:	32	,
"Woebegone"	:	33	,
"Stargazer"	:	34	,
"Anemone"	:	35	,
"Gorgonian"	:	36	,
"Fire Coral"	:	37	,
"Blue Ribbon Eel"	:	38	,
"Parrot Fish"	:	39	,
"Spanish Dancers"	:	40	,
"Flashlight Fish"	:	41	,
"Thresher Shark"	:	42	,
"Orca"	:	43	,
"Mobula"	:	44	,
"Tubbataha Reef"	:	45	,
"Volcano"	:	46	,
"Jack"	:	47	,
"Snapper"	:	48	,
"Goat Fish"	:	49	,
"Emperor Fish"	:	50	,
"Wrasse"	:	51	,
"Tang"	:	52	,
"Butterfly Fish"	:	53	,
"Hawk Fish"	:	54	,
"Humpback Seal"	:	55	,
"Blue Shark"	:	56	,
"Pocilloporids"	:	57	,
"Acroporids"	:	58	,
"Harbor Seal"	:	59	,
"Abalone"	:	60	,
"Rock Cod"	:	61	,
"Garibaldi"	:	62	,
"Sheepshead"	:	63	,
"Angel Shark"	:	64	,
"Sun Fish"	:	65	,
"Giant Sea Bass"	:	66	,
"Black Sea Bass"	:	67	,
"New Yorker"	:	68	,
"Coral"	:	69	,
"USS Spiegel Grove"	:	70	,
"Jellyfish"	:	71	,
"Clown Fish"	:	72	,
"Whale"	:	73	,
"Treasure"	:	74	,
"Fullstack Academy Alum"	:	75	,
"USS Liberty"	:	76	,
"Kormoran"	:	77	,
"Yongala"	:	78	,
"Thistlegorm"	:	79	,
"Turtle"	:	80	,
"Tuna"	:	81	}

const TourGuide = async function (DiveBook, OddsBook, Encyclopedia) {
  let counter = 0
  let fail = 0
  for(let i = 0; i < DiveBook.length; i++) {
    let {id, offeredDiveId} = DiveBook[i]
    console.log("Offered Dive Id ---> ",offeredDiveId)

    let seen = Dice(OddsBook[offeredDiveId - 1])
    for(let j = 0; j < seen.length; ) {
      let seeing = seen.splice(0,1)[0]
      if(seen.indexOf(seeing) === -1) {
        console.log('Seen this dive ------>',seeing)
        counter++
        try {
          await Sighting.create({
            logId: id,
            observationId: Encyclopedia[seeing]
          })
        } catch (error) {
          console.log(error)
          fail++
          console.log('fail ------------->',fail)
        }
      }
    }
  }
  console.log("Total Counter ------> ",counter)
  console.log("Total Fail ------> ",fail)
}

const CertificationsData =
[	Certification.create({ provider: "SSI", level: "Open Water", certId: "515SSI", date: "2017-09-19", diverId: 1}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "869NAUI", date: "2018-11-23", diverId: 1}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "867NAUI", date: "2018-11-20", diverId: 1}),
	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "876NAUI", date: "2018-12-02", diverId: 2}),	Certification.create({ provider: "Other", level: "Deep Diver", certId: "961Other", date: "2019-03-15", diverId: 2}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "081PADI", date: "2016-04-09", diverId: 2}),
	Certification.create({ provider: "PADI", level: "Open Water", certId: "137PADI", date: "2016-06-16", diverId: 3}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "306PADI", date: "2017-01-07", diverId: 3}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "139PADI", date: "2016-06-18", diverId: 3}),
	Certification.create({ provider: "PADI", level: "Open Water", certId: "183PADI", date: "2016-08-11", diverId: 4}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "777NAUI", date: "2018-08-03", diverId: 4}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "423SSI", date: "2017-05-30", diverId: 4}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "728NAUI", date: "2018-06-04", diverId: 5}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "747NAUI", date: "2018-06-28", diverId: 5}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "436SSI", date: "2017-06-14", diverId: 5}),
	Certification.create({ provider: "SSI", level: "Open Water", certId: "371SSI", date: "2017-03-28", diverId: 6}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "304PADI", date: "2017-01-05", diverId: 6}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "002PADI", date: "2016-01-03", diverId: 6}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "735NAUI", date: "2018-06-13", diverId: 7}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "708NAUI", date: "2018-05-11", diverId: 7}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "176PADI", date: "2016-08-02", diverId: 7}),
	Certification.create({ provider: "PADI", level: "Open Water", certId: "099PADI", date: "2016-04-30", diverId: 8}),	Certification.create({ provider: "Other", level: "Deep Diver", certId: "999Other", date: "2019-04-29", diverId: 8}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "326SSI", date: "2017-01-31", diverId: 8}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "844NAUI", date: "2018-10-23", diverId: 9}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "520SSI", date: "2017-09-24", diverId: 9}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "442SSI", date: "2017-06-22", diverId: 9}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "680NAUI", date: "2018-04-07", diverId: 10}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "102PADI", date: "2016-05-04", diverId: 10}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "354SSI", date: "2017-03-07", diverId: 10}),
	Certification.create({ provider: "PADI", level: "Open Water", certId: "148PADI", date: "2016-06-29", diverId: 11}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "136PADI", date: "2016-06-15", diverId: 11}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "881NAUI", date: "2018-12-07", diverId: 11}),
	Certification.create({ provider: "PADI", level: "Open Water", certId: "169PADI", date: "2016-07-25", diverId: 12}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "887NAUI", date: "2018-12-15", diverId: 12}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "651NAUI", date: "2018-03-03", diverId: 12}),
	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "851NAUI", date: "2018-10-31", diverId: 13}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "328SSI", date: "2017-02-03", diverId: 13}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "347SSI", date: "2017-02-26", diverId: 13}),
	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "888NAUI", date: "2018-12-15", diverId: 14}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "097PADI", date: "2016-04-29", diverId: 14}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "740NAUI", date: "2018-06-19", diverId: 14}),
	Certification.create({ provider: "SSI", level: "Open Water", certId: "430SSI", date: "2017-06-07", diverId: 15}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "569SSI", date: "2017-11-23", diverId: 15}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "907NAUI", date: "2019-01-08", diverId: 15}),
  Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "713NAUI", date: "2018-05-17", diverId: 16}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "352SSI", date: "2017-03-04", diverId: 16}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "747NAUI", date: "2018-06-28", diverId: 16})
]

const LocationsData =
[{	Location: "Sipadan Island, Malaysia", 	Latitude: 4.114683, 	Longitude: 118.628756, 		},
{	Location: "Palau, Micronesia", 	Latitude: 7.5, 	Longitude: 134.616667, 		},
{	Location: "Belize City, Belize", 	Latitude: 17.498611, 	Longitude: -88.188611, 		},
{	Location: "Yongala, Australia", 	Latitude: -33.0255, 	Longitude: 138.7581, 		},
{	Location: "Ras Mohammed, Egypt", 	Latitude: 27.722222, 	Longitude: 34.253889, 		},
{	Location: "Sharm El Sheikh, Egypt", 	Latitude: 27.912222, 	Longitude: 34.329722, 		},
{	Location: "Honolulu, Hawaii", 	Latitude: 21.3, 	Longitude: -157.816667, 		},
{	Location: "Navy Pier, Western Australia", 	Latitude: -21.817378, 	Longitude: 114.191304, 		},
{	Location: "Bali, Indonesia", 	Latitude: -8.335, 	Longitude: 115.088056, 		},
{	Location: "Galapagos Islands, Ecuador", 	Latitude: -0.666667, 	Longitude: -90.55, 		},
{	Location: "Verde Island, Philippines", 	Latitude: 13.549722, 	Longitude: 121.070833, 		},
{	Location: "Palawan, Philippines", 	Latitude: 10, 	Longitude: 118.83, 		},
{	Location: "Monterey Bay, California", 	Latitude: 36.8, 	Longitude: -121.9, 		},
{	Location: "Santa Catalina Island, California", 	Latitude: 33.383333, 	Longitude: -118.416667, 		},
{	Location: "Channel Islands National Park", 	Latitude: 34.008333, 	Longitude: -119.416667, 		},
{	Location: "Florida Keys, Florida", 	Latitude: 24.666944, 	Longitude: -81.544167, 		},
{	Location: "New York, NY", 	Latitude: 40.7127, 	Longitude: -74.0059, 		},
{	Location: "Little Cayman, Cayman Islands", 	Latitude: 19.327874, 	Longitude: -81.290303, 		}]

module.exports = {DiveShopsData, OfferedDivesData, ObservationOddsByOfferedDiveData, ObservationsData, DiversData, Dice, ObservationHash, TourGuide, CertificationsData, LocationsData}
