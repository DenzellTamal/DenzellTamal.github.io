// Variables globales
let currentSlide = 0
const slides = document.querySelectorAll(".carousel-slide")
const totalSlides = slides.length

// Función para mostrar slide específico
function showSlide(index) {
  // Remover clase active de todos los slides
  slides.forEach((slide) => slide.classList.remove("active"))

  // Agregar clase active al slide actual
  slides[index].classList.add("active")

  // Actualizar contador
  const currentSlideElement = document.getElementById("currentSlideNumber")
  if (currentSlideElement) {
    currentSlideElement.textContent = index + 1
  }

  currentSlide = index
}

// Función para siguiente slide
function nextSlide() {
  const next = (currentSlide + 1) % totalSlides
  showSlide(next)
}

// Auto-avanzar el carrusel cada 3 segundos
let autoSlide = setInterval(nextSlide, 3000)

// Pausar carrusel cuando la ventana no está visible (optimización)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(autoSlide)
  } else {
    clearInterval(autoSlide) // Limpiar el intervalo anterior
    autoSlide = setInterval(nextSlide, 3000) // Crear uno nuevo
  }
})

// Función para crear corazones flotantes
function createFloatingHeart() {
  const heart = document.createElement("div")
  heart.innerHTML = "♥"
  heart.className = "floating-heart"
  heart.style.left = Math.random() * 100 + "%"
  heart.style.fontSize = 20 + Math.random() * 20 + "px"
  heart.style.animationDelay = Math.random() * 5 + "s"
  heart.style.animationDuration = 8 + Math.random() * 4 + "s"

  return heart
}

// Crear corazones flotantes para el fondo
function initFloatingHearts() {
  const container = document.getElementById("floatingHearts")
  if (container) {
    for (let i = 0; i < 8; i++) {
      const heart = createFloatingHeart()
      container.appendChild(heart)
    }
  }
}

// Crear corazones para la sección final
function createFinalHearts() {
  const container = document.getElementById("finalHearts")
  if (container) {
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement("div")
      heart.innerHTML = "♥"
      heart.className = "final-heart"
      heart.style.left = Math.random() * 100 + "%"
      heart.style.top = Math.random() * 100 + "%"
      heart.style.fontSize = 25 + Math.random() * 35 + "px"
      heart.style.animationDelay = Math.random() * 3 + "s"
      heart.style.animationDuration = 2 + Math.random() * 2 + "s"
      container.appendChild(heart)
    }
  }
}

// Animación de entrada para elementos cuando aparecen en viewport
function animateOnScroll() {
  const elements = document.querySelectorAll(".content-card, .love-card, .meaning-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  elements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(element)
  })
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, iniciando carrusel...")
  console.log("Total de slides encontrados:", totalSlides)

  // Verificar que tenemos slides
  if (totalSlides > 0) {
    // Mostrar el primer slide
    showSlide(0)

    // Actualizar el total de slides en el contador
    const totalSlidesElement = document.getElementById("totalSlides")
    if (totalSlidesElement) {
      totalSlidesElement.textContent = totalSlides
    }

    console.log("Carrusel iniciado correctamente")
  } else {
    console.error("No se encontraron slides!")
  }

  // Inicializar otros elementos
  initFloatingHearts()
  createFinalHearts()
  animateOnScroll()

  // Agregar efecto hover a las tarjetas de amor
  document.querySelectorAll(".love-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Manejar redimensionamiento de ventana
window.addEventListener("resize", () => {
  // Reinicializar carrusel si es necesario
  clearInterval(autoSlide)
  autoSlide = setInterval(nextSlide, 3000)
})

// Precargar imágenes para mejor rendimiento
function preloadImages() {
  console.log("Precargando imágenes...")
  for (let i = 1; i <= 33; i++) {
    const img = new Image()
    img.src = `images/foto${i}.jpg`
    img.onload = () => console.log(`Imagen foto${i}.jpg cargada`)
    img.onerror = () => console.log(`Error cargando foto${i}.jpg`)
  }
}

// Precargar imágenes después de que la página se carga
window.addEventListener("load", () => {
  console.log("Página completamente cargada")
  preloadImages()
})

// Función de debug para verificar el estado del carrusel
function debugCarousel() {
  console.log("=== DEBUG CARRUSEL ===")
  console.log("Slide actual:", currentSlide)
  console.log("Total slides:", totalSlides)
  console.log("Slides encontrados:", slides.length)
  console.log("Slide activo:", document.querySelector(".carousel-slide.active"))
}

// Llamar debug después de 5 segundos para verificar
setTimeout(debugCarousel, 5000)
