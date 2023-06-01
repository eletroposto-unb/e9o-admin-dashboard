import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
})

function Mapa() {
  return (
    <div style={{ width: "100%", height: "100%"}}>
      <Map />
    </div>
  )
}

export default Mapa;
