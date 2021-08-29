function validateConversion(default_unit, convertTo) {
  if (
    ["KG", "MG", "GR"].includes(convertTo) &&
    ["KG", "MG", "GR"].includes(default_unit)
  ) {
    return 1;
  } else if (
    ["L", "ML"].includes(convertTo) &&
    ["L", "ML"].includes(default_unit)
  ) {
    return 2;
  } else {
    return 0;
  }
}

function Convert(default_unit, toUnit, value, unit_price) {
  let rValue;
  if (default_unit == "PC" || toUnit == "PC") return value * unit_price; // for pices
  rValue = ConvertWeight(default_unit, toUnit, value, unit_price);
  rValue = ConvertVolume(default_unit, toUnit, value, unit_price);
  return rValue;
}

function ConvertWeight(default_unit, toUnit, value, unit_price) {
  const MassConvertScale = {
    KG: 1,
    GM: 1000,
    MG: 1000000,
  };
  if (validateConversion(default_unit, toUnit) == 1) {
    if (MassConvertScale[default_unit] < MassConvertScale[toUnit])
      return (
        (MassConvertScale[default_unit] / MassConvertScale[toUnit]) *
        value *
        unit_price
      );
    if (MassConvertScale[default_unit] == MassConvertScale[toUnit])
      return value * unit_price;
    return (
      MassConvertScale[default_unit] *
      MassConvertScale[toUnit] *
      value *
      unit_price
    );
  }
}

function ConvertVolume(default_unit, toUnit, value, unit_price) {
  const VolumeConvertScale = {
    L: 1,
    ML: 1000,
  };
  if (validateConversion(default_unit, toUnit) == 2) {
    if (VolumeConvertScale[default_unit] < VolumeConvertScale[toUnit]) {
      return (
        (VolumeConvertScale[default_unit] / VolumeConvertScale[toUnit]) *
        value *
        unit_price
      );
    } else if (VolumeConvertScale[default_unit] == VolumeConvertScale[toUnit]) {
      return value * unit_price;
    } else {
      return (
        VolumeConvertScale[default_unit] *
        VolumeConvertScale[toUnit] *
        value *
        unit_price
      );
    }
  }
}

let w = Convert("ML", "L", 1, 100);
console.log(w);
