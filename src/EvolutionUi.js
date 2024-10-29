import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './EvolutionUi-styles.js';
import '@bbva-web-components/bbva-button-default/bbva-button-default';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@bbva-web-components/bbva-foundations-spinner/bbva-foundations-spinner.js';
import '@meraki/pokemon-dm/pokemon-dm.js'

export class EvolutionUi extends LitElement {
  static get is() {
    return 'evolution-ui';
  }

  // Declare properties
  static get properties() {
    return {
      id: { type: Text, },
      pokemons: { type: Array, },
      comprobador: { type: Boolean, },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.id = '';
    this.pokemons = [];
    this.comprobador = false;
  }

  async firstUpdated(){
    const pokemonDm = this.shadowRoot.querySelector('pokemon-Dm');
    this.pokemons = await pokemonDm.evolutionPokemonId(this.id);
    this.comprobador = true;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('evolution-ui-shared-styles')
    ];
  }

  get pokemonlistfulla(){
    if (!this.pokemons.length) {
      return null;
    }
    return this.pokemons.map((pokemon) => {
      return html `
      <div class="tarjeta ${pokemon.types.first}">
        <div class="cuerpo">
          <span class="badge fairy">Evolution</span>
          <bbva-type-text class="${pokemon.types.first}" text="${pokemon.name}" size="2XL" alignment="center"></bbva-type-text>
          <img src="${pokemon.img}" alt="${pokemon.name}" width="200" height="200">
        </div>
        <div class="pie">
          <li>
              ${pokemon.types.second ? 
              html`<span class="badge ${pokemon.types.first}">${pokemon.types.first}</span>
              <span class="badge ${pokemon.types.second}">${pokemon.types.second}</span>` 
              : 
              html`<span class="badge ${pokemon.types.first}">${pokemon.types.first}</span>`}
          </li>
        </div>
      </div>
      `; 
    }
  );
  }

  // Define a template
  render() {
    return html`
      <slot></slot>
      <div class="contenedor"> 
       ${this.comprobador ? html`${this.pokemonlistfulla}` : html`<bbva-foundations-spinner size="200" with-mask></bbva-foundations-spinner>`}
      <pokemon-Dm></pokemon-Dm>
      </div> 
    `;
  }
}
