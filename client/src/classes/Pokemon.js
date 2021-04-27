import DefaultSprite from '../media/team-placeholder.jpg';

class Pokemon {
  constructor(name = '???', types = ['Type 1', 'Type 2'], sprite = DefaultSprite) {
    this.name = name;
    this.types = types;
    this.sprite = sprite;
  }

  static InstanceFromApi(data) {
    const name = data.name;
    const types = this.GetTypesArrayFromApi(data);
    const sprite = this.GetSpriteFromApi(data);

    return new Pokemon(name, types, sprite);
  }

  static GetTypesArrayFromApi(data) {
    const types = [];

    for (const type of data.types) {
      types.push(type.type.name);
    }

    return types;
  }

  static GetSpriteFromApi(data) {
    return data.sprites.other['official-artwork'].front_default;
  }
}

export default Pokemon;
