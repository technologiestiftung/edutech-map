// MapContext.js
import React, { createContext, useState, useContext } from 'react';

// create context object
const MapContext = createContext();

// handle state in your provider and pass it as the value
export function MapProvider(props){
  const [map, setMap] = useState();
  return <MapContext.Provider value={[map, setMap]} {...props} />
}

// expose a helper hook to easily grab the state anywhere in your app
// This is an excellent pattern to share state without redux - and be 
// wary of how you can optimise it:
// https://kentcdodds.com/blog/how-to-optimize-your-context-value
export function useMap(){
  const context = useContext(MapContext);
  if(context === undefined) throw Error('You forgot to wrap your app with <MapProvider />');
  return context;
}