import React from "react";
import TextField from "@material-ui/core/TextField";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", id: this.props.id, gmapsLoaded: false };
  }

  initAC = () => {
    this.setState({
      gmapsLoaded: true
    });
  };

  componentDidMount() {
    window.initAC = this.initAC;
    const gmapScriptEl = document.createElement(`script`);
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBNA4QW8E2kzYU_6eR7QmikowbqB3EupJc&libraries=places&callback=initAC`;
    document
      .querySelector(`body`)
      .insertAdjacentElement(`beforeend`, gmapScriptEl);
  }

  componentWillUnmount() {
    // remove all 'maps.googleapis.com' scripts injected into the document
    // https://stackoverflow.com/a/9469983/5045662
    const tags = document.getElementsByTagName("script");
    for (let i = tags.length; i >= 0; i--) {
      //search backwards within nodelist for matching elements to remove
      if (
        tags[i] &&
        tags[i].getAttribute("src") != null &&
        tags[i].getAttribute("src").includes("maps.googleapis.com")
      )
        tags[i].parentNode.removeChild(tags[i]); //remove element by calling parentNode.removeChild()
    }
    // set the google.maps instance on the window to null
    window.google.maps = null;
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .then((document.getElementById(this.props.id).value = this.state.address))
      .then(this.setState({ address }))
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <div>
        {this.state.gmapsLoaded && (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <TextField
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                    id: this.props.id
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}
      </div>
    );
  }
}
