import React from 'react'
import './AboutRestaurant.css'
import { generalpics } from '../../assets/Suraj Menu/pictures'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const AboutRestaurant = () => {
    const restaurantheading = "Suraj"
    const isAboutRes = true;
  return (
    <>
    <Header isAddpage={isAboutRes} />
    <div className="main-container">
        <div className="restaurant-heading"><h2>{restaurantheading}</h2></div>
        <div className="restaurant-img"><img src="src/assets/pictures/suraj_img.png" alt="" /></div>
        <div className="restaurant-desc">Zayn et Falluk, deux frères de Lahore, au Pakistan, ont toujours eu des rêves plus grands que les ruelles étroites de leur ville natale. Ils ont grandi en aidant leur père dans son petit restaurant, où ils ont appris l'essence de la cuisine pakistanaise authentique. Cependant, la vie à Lahore était difficile et les opportunités limitées. Sachant que ses fils avaient du potentiel, leur père a fait un énorme sacrifice : il a vendu un petit terrain qui était dans la famille depuis des générations. L'argent obtenu a suffi à donner à ses fils une chance de se battre pour quelque chose de plus grand.

Avec cet argent, Zayn et Falluk sont partis pour la France, choisissant Nantes comme destination. À leur arrivée, la vie n'a pas été facile. Les frères ont trouvé du travail dans plusieurs restaurants indiens à travers la ville, où ils ont appris les subtilités de la gestion d'une cuisine et l'aspect commercial d'un restaurant. En économisant ce qu'ils pouvaient, ils ont aussi commencé à maîtriser l'art délicat de mélanger les saveurs indiennes et pakistanaises pour créer quelque chose d'unique.

Finalement, avec le don financier de leur père et des années d'expérience pratique, ils se sont sentis prêts à se lancer dans leur projet de rêve. Ils ont acheté un petit mais chaleureux établissement à Nantes et ont ouvert leur premier restaurant, Suraj—un hommage à la chaleur et à la luminosité de leur patrie, spécialisé dans la cuisine indienne et pakistanaise. Suraj est rapidement devenu connu pour ses currys riches, ses épices aromatiques et l'esprit accueillant que Zayn et Falluk infusaient dans chaque plat.

Le succès de Suraj leur a apporté non seulement de la fierté mais aussi de la confiance. Après des années à travailler dans les cuisines des autres et enfin à s'épanouir avec le leur, les frères étaient prêts pour l'étape suivante. Leur deuxième restaurant, Le Kashmir, allait pousser leur voyage culinaire encore plus loin—un endroit où l'élégance de la cuisine française rencontrerait les saveurs audacieuses et vibrantes du Pakistan et de l'Inde.</div>
    </div>
    <Footer/>
    </>
  )
}

export default AboutRestaurant