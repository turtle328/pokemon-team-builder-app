import DefaultSprite from '../../media/team-placeholder.jpg';

class Pokemon {
  constructor(name = '???', types = ['Type', ''], sprite = DefaultSprite) {
    this.name = name;
    this.types = types;
    this.sprite = sprite;
  }

  isDefault() {
    return this.name === '???';
  }

  static instanceFromApi(data) {
    const name = data.name;
    const types = this.getTypesArrayFromApi(data);
    const sprite = this.getSpriteFromApi(data);

    return new Pokemon(name, types, sprite);
  }

  static getTypesArrayFromApi(data) {
    return data.types.map(type => {
      return type.type.name;
    });
  }

  static getSpriteFromApi(data) {
    return data.sprites.other['official-artwork'].front_default;
  }
}

export default Pokemon;
