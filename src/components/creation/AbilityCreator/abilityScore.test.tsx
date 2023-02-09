import { AbilityScoreCard } from "./abilityScoreCard"



test('findTotal addition works', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[3].value = '+1'
    testScoreCard.scores[2].value = '8'
    expect(testScoreCard.findTotal()).toBe('9')
})
test('findTotal returns -- when base score is --', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[3].value = '+1'
    testScoreCard.scores[2].value = '--'
    expect(testScoreCard.findTotal()).toBe('--')
})
test('findModifier returns -1 when total = 8', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[0].value = '8'
    expect(testScoreCard.findModifier()).toBe('-1')
})
test('findModifier returns -1 when total = 9', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[0].value = '9'
    expect(testScoreCard.findModifier()).toBe('-1')
})
test('findModifier returns +0 when total = 10', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[0].value = '10'
    expect(testScoreCard.findModifier()).toBe('+0')
})
test('findModifier returns +0 when total = 11', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[0].value = '11'
    expect(testScoreCard.findModifier()).toBe('+0')
})
test('findModifier returns +1 when total = 12', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[0].value = '12'
    expect(testScoreCard.findModifier()).toBe('+1')
})
test('findModifier returns +1 when total = 13', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[0].value = '13'
    expect(testScoreCard.findModifier()).toBe('+1')
})
test('findModifier returns +2 when total = 14', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[0].value = '14'
    expect(testScoreCard.findModifier()).toBe('+2')
})
test('findModifier returns +2 when total = 15', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[0].value = '15'
    expect(testScoreCard.findModifier()).toBe('+2')
})
test('findModifier returns +3 when total = 16', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[0].value = '16'
    expect(testScoreCard.findModifier()).toBe('+3')
})
test('findModifier returns +3 when total = 17', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.scores[0].value = '8'
    expect(testScoreCard.findModifier()).toBe('-1')
})
test('findRacialBonus returns +1 when name is Strength and race is Human', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Strength'
    expect(testScoreCard.findRacialBones('Human')).toBe('+1')
})
test('findRacialBonus returns +2 when name is Strength and race is Dragonborn', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Strength'
    expect(testScoreCard.findRacialBones('Dragonborn')).toBe('+2')
})
test('findRacialBonus returns +2 when name is Strength and race is Half-Orc', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Strength'
    expect(testScoreCard.findRacialBones('Half-Orc')).toBe('+2')
})
test('findRacialBonus returns +2 when name is Dexterity and race is Elf', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Dexterity'
    expect(testScoreCard.findRacialBones('Elf')).toBe('+2')
})
test('findRacialBonus returns +2 when name is Dexterity and race is Halfling', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Dexterity'
    expect(testScoreCard.findRacialBones('Halfling')).toBe('+2')
})
test('findRacialBonus returns +1 when name is Dexterity and race is Human', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Dexterity'
    expect(testScoreCard.findRacialBones('Human')).toBe('+1')
})
test('findRacialBonus returns +2 when name is Constitution and race is Dwarf', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Constitution'
    expect(testScoreCard.findRacialBones('Dwarf')).toBe('+2')
})
test('findRacialBonus returns +1 when name is Constitution and race is Half-Orc', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Constitution'
    expect(testScoreCard.findRacialBones('Half-Orc')).toBe('+1')
})
test('findRacialBonus returns +1 when name is Constitution and race is Human', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Constitution'
    expect(testScoreCard.findRacialBones('Human')).toBe('+1')
})
test('findRacialBonus returns +1 when name is Intellignece and race is Human', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Intelligence'
    expect(testScoreCard.findRacialBones('Human')).toBe('+1')
})
test('findRacialBonus returns +2 when name is Intellignece and race is Gnome', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Intelligence'
    expect(testScoreCard.findRacialBones('Gnome')).toBe('+2')
})
test('findRacialBonus returns +1 when name is Intellignece and race is Tiefling', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Intelligence'
    expect(testScoreCard.findRacialBones('Tiefling')).toBe('+1')
})
test('findRacialBonus returns +1 when name is Wisdom and race is Human', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Wisdom'
    expect(testScoreCard.findRacialBones('Human')).toBe('+1')
})
test('findRacialBonus returns +1 when name is Charisma and race is Human', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Charisma'
    expect(testScoreCard.findRacialBones('Human')).toBe('+1')
})
test('findRacialBonus returns +1 when name is Charisma and race is Dragonborn', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Charisma'
    expect(testScoreCard.findRacialBones('Dragonborn')).toBe('+1')
})
test('findRacialBonus returns +2 when name is Charisma and race is Half-Elf', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Charisma'
    expect(testScoreCard.findRacialBones('Half-Elf')).toBe('+2')
})
test('findRacialBonus returns +2 when name is Charisma and race is Tiefling', () => {
    const testScoreCard = new AbilityScoreCard()
    testScoreCard.name = 'Charisma'
    expect(testScoreCard.findRacialBones('Tiefling')).toBe('+2')
})