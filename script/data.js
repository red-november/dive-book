const {
  Sighting,
  Certification
} = require('../server/db/models')

const DiveShopsData = [
  {id: 1, name: "Big Blue Explorer", location: "Palawan, Philippines", email: "bbe@email.com", storeFrontImgUrl: "BigBlueExplorer.jpg"},
  {id: 2, name: "Aqua Scuba Center", location: "Belize City, Belize", email: "acb@email.com", storeFrontImgUrl: "AquaScubaCenter.jpeg"},
  {id: 3, name: "Centurion Cruises", location: "Yongala, Australia", email: "cc@email.com", storeFrontImgUrl: "CenturionCruises.jpg"},
  {id: 4, name: "Sea Serpent", location: "Sharm El Sheikh, Egypt", email: "ss@email.com", storeFrontImgUrl: "SeaSerpent.jpg"},
  {id: 5, name: "Kona Honu Divers", location: "Honolulu, Hawaii", email: "khu@email.com", storeFrontImgUrl: "KonaHonuDivers.jpg"},
  {id: 6, name: "Ocean King", location: "Bali, Indonesia", email: "oc@email.com", storeFrontImgUrl: "OceanKing.png"},
  {id: 7, name: "Eco Dive Center", location: "Culver City, California", email: "edc@email.com", storeFrontImgUrl: "EcoDiveCenter.png"},
  {id: 8, name: "Florida Keys Dive Center", location: "Florida Keys, Florida", email: "fkdc@email.com", storeFrontImgUrl: "FloridaKeysDiveCenter.png"},
  {id: 9, name: "Adventure Scuba", location: "New York, NY", email: "as@email.com", storeFrontImgUrl: "AdventureScuba.jpg"},
  {id: 10, name: "Immerse Yourself Safaris", location: "Sodwana Bay, South Africa", email: "iys@email.com", storeFrontImgUrl: "ImmerseYourselfSafaris.jpg"},
  {id: 11, name: "Blue Ocean Diving", location: "Orkney, Scotland", email: "bod@email.com", storeFrontImgUrl: "BlueOceanDiving.jpg"},]

const OfferedDivesData =[
  {	id: 1, 	name: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	description: "Sipadan is a world-class destination, long attracting divers from around the world. Barracuda Point is one of the standout dive sites among many.", 	diveshopId: 1, 	imageURL: "https://i.imgur.com/ndGUt2Z.jpg"	},
  {	id: 2, 	name: "Blue Corner Wall", 	location: "Palau, Micronesia", 	description: "Blue Corner Palau is one of the most action-packed scuba dive sites in the world and up to 13 different species of sharks circling just beyond the plummeting reef wall.", 	diveshopId: 1, 	imageURL: "https://i.imgur.com/BOJMZy7.jpg"	},
  {	id: 3, 	name: "The Great Blue Hole", 	location: "Belize City, Belize", 	description: "The Great Blue Hole is a giant marine sinkhole off the coast of Belize. It lies near the center of Lighthouse Reef.", 	diveshopId: 2, 	imageURL: "https://i.imgur.com/wqdDcOO.jpg"	},
  {	id: 4, 	name: "Yongala", 	location: "Yongala, Australia", 	description: "The Yongala is a shipwreck in Queensland. She sank during a cyclone in 1911 killing 122 people, a racehorse called Moonshine and a red Lincolnshire bull.", 	diveshopId: 3, 	imageURL: "https://i.imgur.com/OGiHDgc.jpg"	},
  {	id: 5, 	name: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	description: "Thistlegorm is Gaelic for Blue Thistle. A British vessel, it was attacked from the air and sunk in 1941 whilst carrying a cargo of war supplies: rifles, motor bikes, train carriages, trucks. A big wreck - 131 metres long.", 	diveshopId: 4, 	imageURL: "https://i.imgur.com/jdi6Fpk.jpg"	},
  {	id: 6, 	name: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	description: "Shark and Yolanda Reef which offers spectacular coral, bizarre fauna and a great selection of fish that included several huge moray eels, a couple of crocodile fish, several pairs of lion fish and our first ever sighting of a rare scorpion fish which is a magnificent pink, yellow and turquoise, plus a couple of huge turtles.", 	diveshopId: 4, 	imageURL: "https://i.imgur.com/y33SbNj.jpg"	},
  {	id: 7, 	name: "Kormoran", 	location: "Ras Mohammed, Egypt", 	description: "One of the best dives (that we did around Tiran Island) was probably the shallowest, to the wreck of the Kormoran. Located north of Tiran Island, the twisted structure of this large container ship is only six to eight metres below the surface and is surrounded by prolific coral that has been stained by the ship's cargo of phosphorous.", 	diveshopId: 4, 	imageURL: "https://i.imgur.com/OUjGWNg.jpg"	},
  {	id: 8, 	name: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	description: "Night time Manta dive gives you a look at an absolute ballet of a menagerie of fish along with some of the largest mantas ever seen.", 	diveshopId: 5, 	imageURL: "https://i.imgur.com/ouAuQnr.jpg"	},
  {	id: 9, 	name: "Navy Pier", 	location: "Navy Pier, Western Australia", 	description: "Amazing diversity of fish life, in a small area. On a good visibility day simply too much to absorb", 	diveshopId: 3, 	imageURL: "https://i.imgur.com/rbWWtxo.jpg"	},
  {	id: 10, 	name: "Liberty", 	location: "Bali, Indonesia", 	description: "The Liberty lies on a black sand slope almost parallel to the beach. It is just 30 metres from the shore. This dive site is suitable for all levels of qualification and experience.", 	diveshopId: 6, 	imageURL: "https://i.imgur.com/QAztzta.jpg"	},
  {	id: 11, 	name: "The Coral Garden", 	location: "Bali, Indonesia", 	description: "Running along the middle section of Tulamben beach is a shallow reef of mainly table and fire corals interspersed with anemones as well as barrel and other sponges.", 	diveshopId: 6, 	imageURL: "https://i.imgur.com/kNZ5rf4.jpg"	},
  {	id: 12, 	name: "Palawan", 	location: "Palawan, Philippines", 	description: "The Philippines is an archipelago of over 7100 islands. It is part of the Coral Triangle, in which live 76% of the world's coral species, 6 of the world's 7 marine turtle species and at least 2,228 reef fish species.", 	diveshopId: 1, 	imageURL: "https://i.imgur.com/CaZNTz4.jpg"	},
  {	id: 13, 	name: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	description: "Darwin's Arch is a natural rock arch feature situated to the southeast of Darwin Island in the Pacific Ocean. The arch sits on an irregularly shaped, rocky, submerged plateau, nicknamed the theatre.", 	diveshopId: 2, 	imageURL: "https://i.imgur.com/kv1VNs3.jpg"	},
  {	id: 14, 	name: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	description: "Magnificent wall dive with unlimited visibility open to the Pacific. Lots of Pelagics: 14 ft blue shark, reef, coral, colour.", 	diveshopId: 5, 	imageURL: "https://i.imgur.com/Vf3YYaW.jpg"	},
  {	id: 15, 	name: "Verde Islands", 	location: "Verde Island, Philippines", 	description: "World class diving, the Best and biggest coral gardens with huge shoals of colourful fishes.", 	diveshopId: 1, 	imageURL: "https://i.imgur.com/Dn7O6dq.jpg"	},
  {	id: 16, 	name: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	description: "The Monterey Bay National Marine Sanctuary (MBNMS) is a US Federally protected marine area offshore of California's Big Sur and central coast. It is the largest US national marine sanctuary and has a shoreline length of 276 miles (444 km) stretching from just north of the Golden Gate Bridge at San Francisco to Cambria in San Luis Obispo County.", 	diveshopId: 7, 	imageURL: "https://i.imgur.com/1FZcmdh.jpg"	},
  {	id: 17, 	name: "Ship Rock", 	location: "Santa Catalina Island, California", 	description: "Ship Rock, Santa Catalina Island lies off the Isthmus about two miles. It takes its name from its great resemblance to a ship under full sail.", 	diveshopId: 7, 	imageURL: "https://i.imgur.com/S5ooGqL.jpg"	},
  {	id: 18, 	name: "Channel Islands National Park", 	location: "Channel Islands National Park", 	description: "Channel Islands National Park is an American national park that consists of five of the eight Channel Islands off the coast of the U.S. state of California, in the Pacific Ocean. Although the islands are close to the shore of densely populated Southern California, their isolation has left them relatively undeveloped.", 	diveshopId: 7, 	imageURL: "https://i.imgur.com/IXqs7hJ.jpg"	},
  {	id: 19, 	name: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	description: "The ship spent 12 years tethered in the Navy’s “Mothball Fleet” in Virginia’s James River. In June 2001, it was towed to undergo an elaborate cleaning process and 11 months later was relocated off Key Largo.", 	diveshopId: 8, 	imageURL: "https://i.imgur.com/c1gv7RZ.jpg"	},
  {	id: 20, 	name: "Wreck Valley", 	location: "New York, NY", 	description: "If you think you can't scuba dive off New York and New Jersey, you are mistaken. There ARE HUNDREDS of shipwrecks.", 	diveshopId: 9, 	imageURL: "https://i.imgur.com/UXzvEio.jpg"	},
  {	id: 21, 	name: "Bloody Bay Wall", 	location: "Little Cayman, Cayman Islands", 	description: "Bloody Bay is the island’s most wondrous dive. Supposedly named for numerous pirate battles, the bay is best known for the incredible underwater drop not far from shore: a nearly vertical wall of coral 300 meters down.", 	diveshopId: 2, 	imageURL: "https://i.imgur.com/ETW68vN.jpg"	},
  {	id: 22, 	name: "Sodwana Bay", 	location: "Sodwana Bay, South Africa", 	description: "Sodwana Bay is a bay in South Africa on the KwaZulu Natal north coast, between St. Lucia and Lake Sibhayi. It is in the Sodwana Bay National Park, and the Maputaland Marine Reserve, and is a popular recreational diving destination.", 	diveshopId: 10, 	imageURL: "https://i.imgur.com/Hcs0hiR.jpg"	},
  {	id: 23, 	name: "Mozambique", 	location: "Barra Beach, Mozambique", 	description: "A major Mozambican tourist destination, Barra is home to beach resorts, private vacation homes, restaurants and diving charters.", 	diveshopId: 10, 	imageURL: "https://i.imgur.com/R7SDq5r.jpg"	},
  {	id: 24, 	name: "Blockship Tabarka", 	location: "Orkney, Scotland", 	description: "One of the last blockships to be sunk. She is upside down with numerous entry points and has been voted the best dive in Europe.", 	diveshopId: 11, 	imageURL: "https://i.imgur.com/t02JadV.jpg"	},
  {	id: 25, 	name: "Richelieu Rock", 	location: "Richelieu Rock, Thailand", 	description: "Giant Manta Rays arrive at the Similans in March and April. At Richelieu Rock you might also be lucky enough to see whale sharks during this time. Come May though, heavy rainfall hits the West coast of Thailand and continues until September.", 	diveshopId: 6, 	imageURL: "https://i.imgur.com/LmBIJZm.jpg"	},]

  const ObservationOddsByOfferedDiveData = [
    {	offereddiveId: 1, 	Guaranteed: "Barracuda, Acroporids",	Common: "Stonefish, Cuttlefish, Nudibranch, Whip Coral, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "White Tip Shark, Black Tip Shark, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
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
    {	offereddiveId: 20, 	Guaranteed: "Shipwreck",	Common: "Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "New Yorker, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
    {	offereddiveId: 21, 	Guaranteed: "Turtle",	Common: "Manta Ray, Nudibranch, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
    {	offereddiveId: 22, 	Guaranteed: "Coral",	Common: "The Sardine Run, Nudibranch, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Great White Shark, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Whale, Opah, Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
    {	offereddiveId: 23, 	Guaranteed: "Coral",	Common: "Nudibranch, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Crocodile Fish, Manta Ray, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Whale, Whale Shark, Great White Shark, Opah, Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
    {	offereddiveId: 24, 	Guaranteed: "Shipwreck",	Common: "Turtle, Seahorse, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},
    {	offereddiveId: 25, 	Guaranteed: "Coral, Nudibranch, Whip Coral",	Common: "Coral, Seahorse, Jack, Snapper, Tang, Parrot Fish, Coral, Anemone",	Uncommon: "Reef Shark, Octopus, Moray Eel, Seahorse, Barracuda, Fusilier, Butterfly Fish, Tuna, Flatworm, Jellyfish, Clown Fish",	Rare: "Whale Shark, Leopard Shark, Nurse Shark, Cuttlefish, Shipwreck, Reef Shark, Dolphin, Nudibranch, Seahorse",	Legendary: "Whale Shark, Whale, New Yorker, Treasure, Psychedelic Frogfish, Fullstack Academy Alum"	},]

    const ObservationsData = [
      {	id: 1, 	name: "Whale Shark", 	category: "fish", 	description: "Slow-moving, filter-feeding carpet shark. the biggest fish in the sea!"	, imageUrl: "https://i.imgur.com/Sqdl9vN.jpg", 	},
      {	id: 2, 	name: "Nudibranch", 	category: "mollusks", 	description: "Sea slug. Lives on coral. Can grow to 4 inches."	, imageUrl: "https://i.imgur.com/5dCRMvh.jpg", 	},
      {	id: 3, 	name: "Psychedelic Frogfish", 	category: "fish", 	description: "Small, short, stocky, and masters of camoflage"	, imageUrl: "https://i.imgur.com/vb6BZjB.jpg", 	},
      {	id: 4, 	name: "Seahorse", 	category: "fish", 	description: "Lives exclusively on coral. Masters of camoflage"	, imageUrl: "https://i.imgur.com/TpEDPa0.jpg", 	},
      {	id: 5, 	name: "Manta Ray", 	category: "fish", 	description: "Majestic creatures with a wingspan of 23 feet"	, imageUrl: "https://i.imgur.com/Jyq4nsa.jpg", 	},
      {	id: 6, 	name: "Reef Shark", 	category: "fish", 	description: "Shark! Scary!"	, imageUrl: "https://i.imgur.com/OKkwCnC.jpg", 	},
      {	id: 7, 	name: "Moray Eel", 	category: "fish", 	description: "Mostly seen in brackish water."	, imageUrl: "https://i.imgur.com/UriEvu3.jpg", 	},
      {	id: 8, 	name: "Cuttlefish", 	category: "mollusks", 	description: "Shape-shifting, color-changing, beast"	, imageUrl: "https://i.imgur.com/4QXIThD.jpg", 	},
      {	id: 9, 	name: "Barrel Sponge", 	category: "sponges", 	description: "Barrel-shaped sponge"	, imageUrl: "https://i.imgur.com/9gxCnRh.jpg", 	},
      {	id: 10, 	name: "Shipwreck", 	category: "inanimate objects", 	description: "Shipwreck. Wonders of the sea"	, imageUrl: "https://i.imgur.com/LnzGDWL.jpg", 	},
      {	id: 11, 	name: "White Tip Shark", 	category: "fish", 	description: "A large pelagic requiem shark inhabiting tropical and warm temperate seas"	, imageUrl: "https://i.imgur.com/C13mfUj.jpg", 	},
      {	id: 12, 	name: "Black Tip Shark", 	category: "fish", 	description: "A special of the requiem shark, and part of thefamily Carcharhinidae"	, imageUrl: "https://i.imgur.com/ARFKooV.jpg", 	},
      {	id: 13, 	name: "Barracuda", 	category: "fish", 	description: "A ray-finned fish known for its large size, fearsome appearance and ferocious behaviour"	, imageUrl: "https://i.imgur.com/JtQKC8L.jpg", 	},
      {	id: 14, 	name: "Fusilier", 	category: "fish", 	description: "A colourful perciform fish. They are mostly associated with snapper."	, imageUrl: "https://i.imgur.com/khx7Vu9.jpg", 	},
      {	id: 15, 	name: "Batfish", 	category: "fish", 	description: "An bizarre creature endemic to the reefs surrounding Galapagos, the Red-lipped Batfish walks instead of swims and looks as though it is wearing lipstick."	, imageUrl: "https://i.imgur.com/ddNKJVC.jpg", 	},
      {	id: 16, 	name: "Stonefish", 	category: "fish", 	description: "Not as hard as I thought!"	, imageUrl: "https://i.imgur.com/GeSvJAJ.jpg", 	},
      {	id: 17, 	name: "Dolphin", 	category: "mammals", 	description: "Most intelligent marvels of the sea"	, imageUrl: "https://i.imgur.com/PCh2yFx.jpg", 	},
      {	id: 18, 	name: "Hammerhead Shark", 	category: "fish", 	description: "Hammerhead sharks are known to eat a large range of prey such as fish (including other sharks), squid, octopus, and crustaceans. Stingrays are a particular favorite."	, imageUrl: "https://i.imgur.com/0hLnmRN.jpg", 	},
      {	id: 19, 	name: "Nurse Shark", 	category: "fish", 	description: "I mean if this shark can heal you…"	, imageUrl: "https://i.imgur.com/8laYbmo.jpg", 	},
      {	id: 20, 	name: "Leopard Shark", 	category: "fish", 	description: "Leopard sharks eat crabs, fish eggs, clam siphons, and burrowing worm species. As they grow older, they eat more fish. "	, imageUrl: "https://i.imgur.com/TmEfrLD.jpg", 	},
      {	id: 21, 	name: "Octopus", 	category: "mollusks", 	description: "The octopus is a soft-bodied, eight-limbed mollusc of the order Octopoda. Around 300 species are recognised, and the order is grouped within the class Cephalopoda with squids, cuttlefish, and nautiloids."	, imageUrl: "https://i.imgur.com/sHSPzdn.jpg", 	},
      {	id: 22, 	name: "Lobster", 	category: "mollusks", 	description: "Lobsters are invertebrates with a hard protective exoskeleton. Lobsters must moult to grow, which leaves them vulnerable. Lobsters have eight walking legs; the front three pairs bear claws, the first of which are larger than the others."	, imageUrl: "https://i.imgur.com/MZnaAcv.png", 	},
      {	id: 23, 	name: "The Great Blue Hole", 	category: "inanimate objects", 	description: "Exploring the World's Largest Sinkhole"	, imageUrl: "https://i.imgur.com/goVEtWZ.jpg", 	},
      {	id: 24, 	name: "Sea Snake", 	category: "fish", 	description: "Sea snakes, or coral reef snakes, are a subfamily of venomous elapid snakes, the Hydrophiinae, that inhabit marine environments for most or all of their lives."	, imageUrl: "https://i.imgur.com/wqOp9Xy.jpg", 	},
      {	id: 25, 	name: "Whip Coral", 	category: "coral", 	description: "Vine-shaped coral"	, imageUrl: "https://i.imgur.com/FM8bWPQ.jpg", 	},
      {	id: 26, 	name: "Bull Shark", 	category: "fish", 	description: "Bull sharks are the most dangerous sharks in the world, according to many experts."	, imageUrl: "https://i.imgur.com/Qkm9lMO.jpg", 	},
      {	id: 27, 	name: "Tiger Shark", 	category: "fish", 	description: "The tiger shark is a solitary, mostly nocturnal hunter. It is notable for having the widest food spectrum of all sharks, with a range of prey that includes crustaceans, fish, seals, birds, squid, turtles, sea snakes, dolphins, and even other smaller sharks."	, imageUrl: "https://i.imgur.com/vUm2g0Z.jpg", 	},
      {	id: 28, 	name: "Scorpion Fish", 	category: "fish", 	description: "A scorpion fish is a group of predatory, marine fish that are found amongst coral reefs and in shallow waters in the more temperate oceans."	, imageUrl: "https://i.imgur.com/R34opNy.jpg", 	},
      {	id: 29, 	name: "Crocodile Fish", 	category: "fish", 	description: "De Beaufort's flathead"	, imageUrl: "https://i.imgur.com/SQ1mxNZ.jpg", 	},
      {	id: 30, 	name: "Crocodile", 	category: "other living things", 	description: "Don't go near this beast"	, imageUrl: "https://i.imgur.com/e04avM1.jpg", 	},
      {	id: 31, 	name: "Lion Fish", 	category: "fish", 	description: "The lionfish is a carnivorous fish native to the Indo-Pacific that is now an invasive species in the Atlantic."	, imageUrl: "https://i.imgur.com/OaopnSX.jpg", 	},
      {	id: 32, 	name: "Flatworm", 	category: "other living things", 	description: "So flat, yu can't see them!"	, imageUrl: "https://i.imgur.com/kl4FLEG.jpg", 	},
      {	id: 33, 	name: "Woebegone", 	category: "coral", 	description: "Woeeeee1!!!!!!"	, imageUrl: "https://i.imgur.com/DMH4uMl.jpg", 	},
      {	id: 34, 	name: "Stargazer", 	category: "fish", 	description: "If you find youself gazing at this creature, you dived deep"	, imageUrl: "https://i.imgur.com/C1ZvngA.jpg", 	},
      {	id: 35, 	name: "Anemone", 	category: "mollusks", 	description: "Enomena ~ duh duh, duh duh duh"	, imageUrl: "https://i.imgur.com/JVwmQyW.jpg", 	},
      {	id: 36, 	name: "Gorgonian", 	category: "coral", 	description: "Oooooh Pretty"	, imageUrl: "https://i.imgur.com/bb9CeiC.jpg", 	},
      {	id: 37, 	name: "Fire Coral", 	category: "coral", 	description: "Oooooh Glamorous!"	, imageUrl: "https://i.imgur.com/WTBMSle.jpg", 	},
      {	id: 38, 	name: "Blue Ribbon Eel", 	category: "fish", 	description: "Beware, this can follow you on land"	, imageUrl: "https://i.imgur.com/pf3U7Et.jpg", 	},
      {	id: 39, 	name: "Parrot Fish", 	category: "fish", 	description: "If only this fish would echo our sentences"	, imageUrl: "https://i.imgur.com/mmO8GEc.jpg", 	},
      {	id: 40, 	name: "Spanish Dancers", 	category: "mollusks", 	description: "Red with Passion!"	, imageUrl: "https://i.imgur.com/kaWjaD4.jpg", 	},
      {	id: 41, 	name: "Flashlight Fish", 	category: "fish", 	description: "This is, luckily, not the Angler fish. You can still see the light!"	, imageUrl: "https://i.imgur.com/2pqKget.jpg", 	},
      {	id: 42, 	name: "Thresher Shark", 	category: "fish", 	description: "FOR MOST SHARKS, the front end is the dangerous bit. Thresher sharks are the exception. They’re deadly at both ends, because they’ve managed to weaponise their tails."	, imageUrl: "https://i.imgur.com/j0QK79b.jpg", 	},
      {	id: 43, 	name: "Orca", 	category: "mammals", 	description: "Mega!"	, imageUrl: "https://i.imgur.com/RSi3nV7.jpg", 	},
      {	id: 44, 	name: "Mobula", 	category: "mammals", 	description: "Super Mega!"	, imageUrl: "https://i.imgur.com/pAW1dj1.jpg", 	},
      {	id: 45, 	name: "Tubbataha Reef", 	category: "coral", 	description: "Perlas nang silanganan!"	, imageUrl: "https://i.imgur.com/uiYGzDt.jpg", 	},
      {	id: 46, 	name: "Volcano", 	category: "inanimate objects", 	description: "Inactive I hope"	, imageUrl: "https://i.imgur.com/sUgkdBQ.jpg", 	},
      {	id: 47, 	name: "Jack", 	category: "fish", 	description: "Jackfish are a large family of sleek predators, native to warm and temperate waters around the world. "	, imageUrl: "https://i.imgur.com/L4N6hxE.jpg", 	},
      {	id: 48, 	name: "Snapper", 	category: "fish", 	description: "Hundreds of snapper species exist, named after their snapping teeth. "	, imageUrl: "https://i.imgur.com/7yLJpwV.jpg", 	},
      {	id: 49, 	name: "Goat Fish", 	category: "fish", 	description: "baaaaaah"	, imageUrl: "https://i.imgur.com/35lR9IF.jpg", 	},
      {	id: 50, 	name: "Emperor Fish", 	category: "fish", 	description: "Lutjanus sebae, the emperor red snapper, is an inhabitant of both rocky and coral reefs, preferring flat areas with either a sandy or gravel substrate."	, imageUrl: "https://i.imgur.com/SkKVXfj.jpg", 	},
      {	id: 51, 	name: "Wrasse", 	category: "fish", 	description: "They are some of the most colorful of the moderately-sized saltwater"	, imageUrl: "https://i.imgur.com/dUowxef.jpg", 	},
      {	id: 52, 	name: "Tang", 	category: "fish", 	description: "DORY!!!!!"	, imageUrl: "https://i.imgur.com/nVy6rXM.jpg", 	},
      {	id: 53, 	name: "Butterfly Fish", 	category: "fish", 	description: "The butterfly fish is a generally small-sized species of marine fish, found in tropical and subtropical waters, primarily around coral reefs. The butterfly fish is well known for its brightly coloured body and elaborate markings."	, imageUrl: "https://i.imgur.com/iJDkKef.jpg", 	},
      {	id: 54, 	name: "Hawk Fish", 	category: "fish", 	description: "Most Hawkfish reach a size of three inches and are hardy specimens that adjust well to aquarium life. "	, imageUrl: "https://i.imgur.com/AcUKiQL.jpg", 	},
      {	id: 55, 	name: "Humpback Seal", 	category: "mammals", 	description: "Acrobats of the sea"	, imageUrl: "https://i.imgur.com/MsjQB42.jpg", 	},
      {	id: 56, 	name: "Blue Shark", 	category: "fish", 	description: "The blue shark is a curious, open-ocean predator that lives throughout the global ocean, from the tropics to cold temperate waters."	, imageUrl: "https://i.imgur.com/Oqftz9q.jpg", 	},
      {	id: 57, 	name: "Pocilloporids", 	category: "coral", 	description: "The Pocilloporidae are a family of stony corals in the order Scleractinia occurring in the Pacific and Indian Oceans."	, imageUrl: "https://i.imgur.com/KHYOSgz.jpg", 	},
      {	id: 58, 	name: "Acroporids", 	category: "coral", 	description: "Corals are actually colonies of many tiny invertebrate animals called polyps, which together form a hard calcium carbonate skeleton."	, imageUrl: "https://i.imgur.com/DNSXE3O.jpg", 	},
      {	id: 59, 	name: "Harbor Seal", 	category: "mammals", 	description: "If you see this as a baby, you will want to adopt one UwU"	, imageUrl: "https://i.imgur.com/0UtSybs.jpg", 	},
      {	id: 60, 	name: "Abalone", 	category: "mollusks", 	description: "Abalone (from Spanish Abulón) are shellfish, a genus of gastropods. Abalone are known by their colorful pearlescent inside shell."	, imageUrl: "https://i.imgur.com/R53Jrzo.jpg", 	},
      {	id: 61, 	name: "Rock Cod", 	category: "fish", 	description: "Pacific rockfish—also known as rock cod or Pacific snapper—is a very versatile fish. "	, imageUrl: "https://i.imgur.com/pmEpltB.jpg", 	},
      {	id: 62, 	name: "Garibaldi", 	category: "fish", 	description: "Garibaldis are a great fish—really cool, very personable, but very aggressive"	, imageUrl: "https://i.imgur.com/v1V62ug.jpg", 	},
      {	id: 63, 	name: "Sheepshead", 	category: "fish", 	description: "baaaaaah"	, imageUrl: "https://i.imgur.com/4DNOql4.jpg", 	},
      {	id: 64, 	name: "Angel Shark", 	category: "fish", 	description: "A shark that looks like a Ray - Heaven meets Hell"	, imageUrl: "https://i.imgur.com/x6d8BRM.jpg", 	},
      {	id: 65, 	name: "Sun Fish", 	category: "fish", 	description: "Sunfish, or mola, develop their truncated, bullet-like shape because the back fin which they are born with simply never grows."	, imageUrl: "https://i.imgur.com/PtTa8cN.jpg", 	},
      {	id: 66, 	name: "Giant Sea Bass", 	category: "fish", 	description: "Giant sea bass can live at least 70 years, grow to 7 feet in length and weigh up to 560 pounds."	, imageUrl: "https://i.imgur.com/AJss8DM.jpg", 	},
      {	id: 67, 	name: "Black Sea Bass", 	category: "fish", 	description: "Moat descriptions are food related. Good luck, friends!"	, imageUrl: "https://i.imgur.com/xuKbvqz.jpg", 	},
      {	id: 68, 	name: "New Yorker", 	category: "mammals", 	description: "(prop n.) 1. A resident of New York. 2. Someone who can speak Profanese. 3. A damned ornery person."	, imageUrl: "https://i.imgur.com/WXElb5g.jpg", 	},
      {	id: 69, 	name: "Coral", 	category: "coral", 	description: "Fascinating looking coral"	, imageUrl: "https://i.imgur.com/bnRnahm.jpg", 	},
      {	id: 70, 	name: "USS Spiegel Grove", 	category: "inanimate objects", 	description: "The breathtakingly enormous Spiegel Grove — nearly two football fields long — is the “grande dame” of Key Largo wrecks. "	, imageUrl: "https://i.imgur.com/361uB5f.jpg", 	},
      {	id: 71, 	name: "Jellyfish", 	category: "other living things", 	description: "Jumping Jellyfish…"	, imageUrl: "https://i.imgur.com/A21CEcL.jpg", 	},
      {	id: 72, 	name: "Clown Fish", 	category: "fish", 	description: "NEMO!!"	, imageUrl: "https://i.imgur.com/w9HiFVZ.jpg", 	},
      {	id: 73, 	name: "Whale", 	category: "mammals", 	description: "You may spot a few hazy puffs and say “I guess that's a whale,” or you could find yourself face-to-blowhole with a colossal marine mammal in a majestic, life affirming experience."	, imageUrl: "https://i.imgur.com/UyA2ekx.jpg", 	},
      {	id: 74, 	name: "Treasure", 	category: "inanimate objects", 	description: "$$$"	, imageUrl: "https://i.imgur.com/aYcgUiI.jpg", 	},
      {	id: 75, 	name: "Fullstack Academy Alum", 	category: "mammals", 	description: "Class of 1902!!"	, imageUrl: "https://i.imgur.com/P7xS7wy.png", 	},
      {	id: 76, 	name: "USS Liberty", 	category: "inanimate objects", 	description: "Shipwreck. Wonders of the sea"	, imageUrl: "https://i.imgur.com/C2zl06t.jpg", 	},
      {	id: 77, 	name: "Kormoran", 	category: "inanimate objects", 	description: "Shipwreck. Wonders of the sea"	, imageUrl: "https://i.imgur.com/Nk9rEqW.jpg", 	},
      {	id: 78, 	name: "Yongala", 	category: "inanimate objects", 	description: "Shipwreck. Wonders of the sea"	, imageUrl: "https://i.imgur.com/OGiHDgc.jpg", 	},
      {	id: 79, 	name: "Thistlegorm", 	category: "inanimate objects", 	description: "Shipwreck. Wonders of the sea"	, imageUrl: "https://i.imgur.com/jdi6Fpk.jpg", 	},
      {	id: 80, 	name: "Turtle", 	category: "other living things", 	description: "This guy probably lived longer than my grandpa"	, imageUrl: "https://i.imgur.com/XVhsGts.jpg", 	},
      {	id: 81, 	name: "Tuna", 	category: "fish", 	description: "Quite big for a fish"	, imageUrl: "https://i.imgur.com/e27O3yu.jpg", 	},
      {	id: 82, 	name: "Great White Shark", 	category: "fish", 	description: "Carcharodon carcharias are the largest known predatory fish in the sea. They reach lengths of over 6.1 m and can weigh up to 2,268 kg. The great white shark population is decreasing due to years of being hunted by man for fins and teeth, and often as a trophy for sport fishing."	, imageUrl: "https://i.imgur.com/LzkmBal.jpg", 	},
      {	id: 83, 	name: "The Sardine Run", 	category: "fish", 	description: "The annual migration of the South African pilchard (Sardinops sagax) from the cold Cap Agulhas in the west round the coast towards Aliwal Shoal and Durban"	, imageUrl: "https://i.imgur.com/BXXuA6G.jpg", 	},
      {	id: 84, 	name: "SS Inharrime", 	category: "inanimate objects", 	description: "Shipwreck. Wonders of the sea"	, imageUrl: "https://i.imgur.com/zdhw3RQ.jpg", 	},
      {	id: 85, 	name: "Opah", 	category: "fish", 	description: "Opahs are large, colorful, deep-bodied pelagic lampriform fishes comprising the small family Lampridae. Only two living species occur in a single genus: Lampris."	, imageUrl: "https://i.imgur.com/cpEikBz.jpg", 	},]

  const DiversData = [
  {	id: 1, 	firstName: "Cody", 	lastName: "De Coder", 	email: "cody@email.com", 	password: "123", 	height: 185, 	weight: 78, 	diveshopId: 1	},
  {	id: 2, 	firstName: "Murphy", 	lastName: "Law", 	email: "murphy@email.com", 	password: "123", 	height: 173, 	weight: 73, 	diveshopId: null	},
  {	id: 3, 	firstName: "William", 	lastName: "Tanner", 	email: "AnitaTan@email.com", 	password: "123", 	height: 196, 	weight: 76, 	diveshopId: null	},
  {	id: 4, 	firstName: "Grace", 	lastName: "Shopper", 	email: "gs@fsa.com", 	password: "123", 	height: 182, 	weight: 79, 	diveshopId: null	},
  {	id: 5, 	firstName: "Navin", 	lastName: "Donohue", 	email: "Navin.Donohue@email.com", 	password: "123", 	height: 184, 	weight: 69, 	diveshopId: null	},
  {	id: 6, 	firstName: "Esther", 	lastName: "Mullane", 	email: "Esther.Mullane@email.com", 	password: "123", 	height: 158, 	weight: 63, 	diveshopId: null	},
  {	id: 7, 	firstName: "Ximun", 	lastName: "Nuddi", 	email: "Ximun.Nuddi@email.com", 	password: "123", 	height: 151, 	weight: 60, 	diveshopId: null	},
  {	id: 8, 	firstName: "Agnete", 	lastName: "Steensen", 	email: "Agnete.Steensen@email.com", 	password: "123", 	height: 185, 	weight: 76, 	diveshopId: null	},
  {	id: 9, 	firstName: "Zosimus", 	lastName: "Faucher", 	email: "Zosimus.Faucher@email.com", 	password: "123", 	height: 151, 	weight: 58, 	diveshopId: null	},
  {	id: 10, 	firstName: "Raphaela", 	lastName: "Noyer", 	email: "Raphaela.Noyer@email.com", 	password: "123", 	height: 168, 	weight: 61, 	diveshopId: null	},
  {	id: 11, 	firstName: "Ben", 	lastName: "Awesome", 	email: "Ben.Awesome@email.com", 	password: "123", 	height: 157, 	weight: 51, 	diveshopId: null	},
  {	id: 12, 	firstName: "Severina", 	lastName: "Constable", 	email: "Severina.Constable@email.com", 	password: "123", 	height: 161, 	weight: 64, 	diveshopId: null	},
  {	id: 13, 	firstName: "Murdag", 	lastName: "Queen", 	email: "Murdag.Queen@email.com", 	password: "123", 	height: 173, 	weight: 58, 	diveshopId: null	},
  {	id: 14, 	firstName: "Rubye", 	lastName: "Jeffers", 	email: "Rubye.Jeffers@email.com", 	password: "123", 	height: 191, 	weight: 79, 	diveshopId: 3	},
  {	id: 15, 	firstName: "Cathryn", 	lastName: "Danniell", 	email: "Cathryn.Danniell@email.com", 	password: "123", 	height: 164, 	weight: 52, 	diveshopId: 2	},
  {	id: 16, 	firstName: "Jam", 	lastName: "Superman", 	email: "Jam.Superman@email.com", 	password: "123", 	height: 201, 	weight: 92, 	diveshopId: null	},
  {	id: 17, 	firstName: "Vincent", 	lastName: "Price", 	email: "Vincent.Price@email.com", 	password: "123", 	height: 178, 	weight: 77, 	diveshopId: null	},
  {	id: 18, 	firstName: "Czan", 	lastName: "Czavier", 	email: "Czan.Czavier@email.com", 	password: "123", 	height: 155, 	weight: 63, 	diveshopId: 9	},
  {	id: 19, 	firstName: "Jojo", 	lastName: "Bizzare", 	email: "Jojo.Bizzare@email.com", 	password: "123", 	height: 181, 	weight: 76, 	diveshopId: 4	},
  {	id: 20, 	firstName: "Dio", 	lastName: "Brando", 	email: "Dio.Brando@email.com", 	password: "123", 	height: 152, 	weight: 47, 	diveshopId: 6	},
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
    if(Math.random() > 0.999)
    acc.push(elem)
    return acc
  },seen)
  return seen
}

const ObservationHash =
{	"Whale Shark"	:	1	,
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
	"Tuna"	:	81	,
	"Great White Shark"	:	82	,
	"The Sardine Run"	:	83	,
	"SS Inharrime"	:	84	,
	"Opah"	:	85	}

const TourGuide = async function (DiveBook, OddsBook, Encyclopedia) {
  let counter = 0
  let fail = 0
  for(let i = 0; i < DiveBook.length; i++) {
    let {id, offeredDiveId} = DiveBook[i]

    let seen = Dice(OddsBook[offeredDiveId - 1])
    for(let j = 0; j < seen.length; ) {
      let seeing = seen.splice(0,1)[0]
      if(seen.indexOf(seeing) === -1) {
        counter++
        try {
          await Sighting.create({
            logId: id,
            observationId: Encyclopedia[seeing]
          })
        } catch (error) {
          console.log(error)
          fail++
          console.log('fail ------------------>',fail)
        }
      }
    }
  }
  console.log("Total Observations ------> ",counter)
  console.log("Total Fail --------------> ",fail)
}

const CertificationsData =
[	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "880NAUI", date: "2018-10-23", diverId: 1, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "766NAUI", date: "2018-04-27", diverId: 1, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "444SSI", date: "2016-12-04", diverId: 1, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "691NAUI", date: "2017-12-30", diverId: 2, instructorId: "HCOLE1234"}),	Certification.create({ provider: "Other", level: "Rescue Diver", certId: "951Other", date: "2019-02-13", diverId: 2, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "353SSI", date: "2016-07-13", diverId: 2, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "PADI", level: "Open Water", certId: "249PADI", date: "2016-01-29", diverId: 3, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "742NAUI", date: "2018-03-20", diverId: 3, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "846NAUI", date: "2018-08-30", diverId: 3, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "786NAUI", date: "2018-05-28", diverId: 4, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "737NAUI", date: "2018-03-11", diverId: 4, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "768NAUI", date: "2018-04-30", diverId: 4, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "738NAUI", date: "2018-03-13", diverId: 5, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "711NAUI", date: "2018-01-30", diverId: 5, instructorId: "HCOLE1234"}),	Certification.create({ provider: "Other", level: "Deep Diver", certId: "961Other", date: "2019-02-28", diverId: 5, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "Other", level: "Rescue Diver", certId: "953Other", date: "2019-02-15", diverId: 6, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "110PADI", date: "2015-06-24", diverId: 6, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "860NAUI", date: "2018-09-22", diverId: 6, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "PADI", level: "Open Water", certId: "157PADI", date: "2015-09-07", diverId: 7, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "798NAUI", date: "2018-06-16", diverId: 7, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "166PADI", date: "2015-09-20", diverId: 7, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "849NAUI", date: "2018-09-05", diverId: 8, instructorId: "HCOLE1234"}),	Certification.create({ provider: "Other", level: "Deep Diver", certId: "978Other", date: "2019-03-28", diverId: 8, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "877NAUI", date: "2018-10-19", diverId: 8, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "PADI", level: "Open Water", certId: "236PADI", date: "2016-01-10", diverId: 9, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "061PADI", date: "2015-04-08", diverId: 9, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "386SSI", date: "2016-09-03", diverId: 9, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "655NAUI", date: "2017-11-02", diverId: 10, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "687NAUI", date: "2017-12-23", diverId: 10, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "643NAUI", date: "2017-10-15", diverId: 10, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "635NAUI", date: "2017-10-01", diverId: 11, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "745NAUI", date: "2018-03-25", diverId: 11, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "217PADI", date: "2015-12-11", diverId: 11, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "SSI", level: "Open Water", certId: "412SSI", date: "2016-10-14", diverId: 12, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "294PADI", date: "2016-04-10", diverId: 12, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "325SSI", date: "2016-05-30", diverId: 12, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "PADI", level: "Open Water", certId: "165PADI", date: "2015-09-20", diverId: 13, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "814NAUI", date: "2018-07-11", diverId: 13, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "863NAUI", date: "2018-09-27", diverId: 13, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "775NAUI", date: "2018-05-10", diverId: 14, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "510SSI", date: "2017-03-18", diverId: 14, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "160PADI", date: "2015-09-11", diverId: 14, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "SSI", level: "Open Water", certId: "317SSI", date: "2016-05-16", diverId: 15, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "588SSI", date: "2017-07-19", diverId: 15, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "308PADI", date: "2016-05-02", diverId: 15, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "SSI", level: "Open Water", certId: "427SSI", date: "2016-11-07", diverId: 16, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "516SSI", date: "2017-03-27", diverId: 16, instructorId: "HCOLE1234"}),	Certification.create({ provider: "Other", level: "Rescue Diver", certId: "954Other", date: "2019-02-18", diverId: 16, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "PADI", level: "Open Water", certId: "208PADI", date: "2015-11-26", diverId: 17, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "525SSI", date: "2017-04-10", diverId: 17, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "638NAUI", date: "2017-10-06", diverId: 17, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "SSI", level: "Advanced Open Water", certId: "612SSI", date: "2017-08-26", diverId: 18, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "336SSI", date: "2016-06-16", diverId: 18, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "660NAUI", date: "2017-11-10", diverId: 18, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "928NAUI", date: "2019-01-08", diverId: 19, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "078PADI", date: "2015-05-04", diverId: 19, instructorId: "HCOLE1234"}),	Certification.create({ provider: "Other", level: "Deep Diver", certId: "994Other", date: "2019-04-22", diverId: 19, instructorId: "HCOLE1234"}),
	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "801NAUI", date: "2018-06-21", diverId: 20, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "680NAUI", date: "2017-12-12", diverId: 20, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "195PADI", date: "2015-11-06", diverId: 20, instructorId: "HCOLE1234"}),		]

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
{	Location: "Little Cayman, Cayman Islands", 	Latitude: 19.327874, 	Longitude: -81.290303, 		},
{	Location: "Sodwana Bay, South Africa", 	Latitude: -27.533333, 	Longitude: 32.683333, 		},
{	Location: "Barra Beach, Mozambique", 	Latitude: -23.794722, 	Longitude: 35.538056, 		},
{	Location: "Culver City, California", 	Latitude: 34.007778, 	Longitude: -118.400833, 		},
{	Location: "Orkney, Scotland", 	Latitude: 58.9, 	Longitude: -3.05, 		},
{	Location: "Richelieu Rock, Thailand", 	Latitude: 9.416667, 	Longitude: 97.866667, 		}]

module.exports = {DiveShopsData, OfferedDivesData, ObservationOddsByOfferedDiveData, ObservationsData, DiversData, Dice, ObservationHash, TourGuide, CertificationsData, LocationsData}
