import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"
import { ChangeEvent, forwardRef, useImperativeHandle, useRef, useState } from "react"
import { getTunisianCities, getTunisianZonesIn } from "@lib/data"

interface TunisianCitiesSelectProps extends NativeSelectProps {
  registerCity: any; // Adjust the type based on your actual type for register
  registerProvince: any; // Adjust the type based on your actual type for register
}

const TunisianCitiesSelect = forwardRef<HTMLSelectElement, TunisianCitiesSelectProps>(
  ({ placeholder = "Ville", registerCity, registerProvince, ...props}, ref) => {
    const cityRef = useRef<HTMLSelectElement>(null)
    const regionRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => cityRef.current
    )
    
    const cities = getTunisianCities().cities;

    const [selectedCity, setSelectedCity] = useState<string | undefined>(cityRef.current?.value);
    const [regions, setRegions] = useState(getTunisianZonesIn(selectedCity));
    
    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const newSelectedCity = event.target.value;
      setSelectedCity(newSelectedCity);

      setRegions(getTunisianZonesIn(newSelectedCity));
    };
  
    return (
      <>
        <NativeSelect ref={cityRef} placeholder={placeholder} onInput={handleCityChange} {...registerCity}>
          {cities.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </NativeSelect>

        {(regions.length) ? (
          <NativeSelect ref={regionRef} placeholder="Région" {...registerProvince}>
            {regions.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </NativeSelect>
        ): <></> }
      </>
    )
  }
)

TunisianCitiesSelect.displayName = "ChoisirVille"

export default TunisianCitiesSelect
