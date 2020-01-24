function orderLayers(map, order) {
  const layerIds = Object.keys(map.style._layers); // eslint-disable-line

  order.forEach((key) => {
    const currentLayerIds = layerIds.filter(l => l.startsWith(key));

    currentLayerIds.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.moveLayer(layerId);
      }
    });
  });
}

export default {
  orderLayers,
};
