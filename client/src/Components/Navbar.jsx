import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar = () => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const indicatorRef = useRef(null);
  const burgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const location = useLocation();
  const isMenuOpen = useRef(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const particles = useRef([]);
  const requestRef = useRef();
  const logoHovered = useRef(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/discover', label: 'Discover' },
    { path: '/profile', label: 'Profile' },
  ];

  // Particle system for hover effects
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match navbar
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 80;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createParticle = (x, y, color) => {
      return {
        x,
        y,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color,
        life: 100,
        opacity: Math.random() * 0.5 + 0.5
      };
    };

    const emitParticles = (x, y, color, count = 10) => {
      for (let i = 0; i < count; i++) {
        particles.current.push(createParticle(x, y, color));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 1;
        particle.opacity -= 0.01;
        
        // Draw particle
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Remove dead particles
        if (particle.life <= 0 || particle.opacity <= 0) {
          particles.current.splice(index, 1);
        }
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Initial animations
  useEffect(() => {
    // Initial navbar animation
    gsap.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0, rotationX: 45 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: "power3.out" }
    );

    // Logo animation with glow effect
    const logoTl = gsap.timeline();
    logoTl.fromTo(
      logoRef.current,
      { scale: 0, rotation: -45, filter: 'blur(10px)' },
      { scale: 1, rotation: 0, filter: 'blur(0px)', duration: 1.5, ease: "elastic.out(1, 0.3)" }
    );
    logoTl.to(logoRef.current, {
      boxShadow: '0 0 15px rgba(125,90,255,0.7)',
      repeat: 2,
      yoyo: true,
      duration: 0.5
    });

    // Links animation with staggered 3D effect
    gsap.fromTo(
      linksRef.current,
      { y: -20, opacity: 0, rotationY: 45 },
      { 
        y: 0, 
        opacity: 1, 
        rotationY: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "back.out(1.7)" 
      }
    );

    // Handle scrolling effects
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navbarHeight = navbarRef.current.offsetHeight;
      
      if (scrollY > navbarHeight && !isScrolled) {
        gsap.to(navbarRef.current, {
          backgroundColor: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 5px 20px rgba(125,90,255,0.15)',
          height: '70px',
          duration: 0.3
        });
        setIsScrolled(true);
      } else if (scrollY <= navbarHeight && isScrolled) {
        gsap.to(navbarRef.current, {
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          height: '80px',
          duration: 0.3
        });
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Update active link indicator initially
    const activeIndex = navLinks.findIndex(link => link.path === location.pathname);
    if (activeIndex >= 0 && linksRef.current[activeIndex] && indicatorRef.current) {
      const linkBounds = linksRef.current[activeIndex].getBoundingClientRect();
      const navBounds = navbarRef.current.getBoundingClientRect();
      
      gsap.set(indicatorRef.current, {
        width: linkBounds.width,
        x: linkBounds.left - navBounds.left,
        opacity: 1
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  // Update indicator when route changes
  useEffect(() => {
    const activeIndex = navLinks.findIndex(link => link.path === location.pathname);
    
    if (activeIndex >= 0 && linksRef.current[activeIndex] && indicatorRef.current) {
      const linkBounds = linksRef.current[activeIndex].getBoundingClientRect();
      const navBounds = navbarRef.current?.getBoundingClientRect();
      
      gsap.to(indicatorRef.current, {
        width: linkBounds.width,
        x: linkBounds.left - navBounds.left,
        duration: 0.4,
        ease: "elastic.out(1, 0.75)"
      });
      
      // Update active link color
      linksRef.current.forEach((link, idx) => {
        gsap.to(link, {
          color: idx === activeIndex ? "#8A2BE2" : "rgba(255, 255, 255, 0.9)",
          duration: 0.3
        });
      });
    }
  }, [location.pathname]);

  // Burger menu animation
  const handleBurgerClick = () => {
    isMenuOpen.current = !isMenuOpen.current;
    
    const tl = gsap.timeline();
    
    if (isMenuOpen.current) {
      // Animate burger to X with more fluid motion
      tl.to(burgerRef.current.children[0], { 
        y: 8, rotate: 45, duration: 0.3, ease: "power2.out" 
      }, 0);
      tl.to(burgerRef.current.children[2], { 
        y: -8, rotate: -45, duration: 0.3, ease: "power2.out" 
      }, 0);
      tl.to(burgerRef.current.children[1], { 
        scaleX: 0, opacity: 0, duration: 0.2 
      }, 0);
      
      // Show mobile menu with wave effect
      tl.to(mobileMenuRef.current, { 
        height: "auto", 
        opacity: 1, 
        duration: 0.5,
        ease: "power2.out" 
      });
      tl.fromTo(
        mobileMenuRef.current.children, 
        { x: -20, opacity: 0 }, 
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "back.out(1.7)" }, 
        "-=0.3"
      );
    } else {
      // Animate X back to burger
      tl.to(mobileMenuRef.current.children, { 
        x: 20, opacity: 0, stagger: -0.05, duration: 0.2 
      });
      tl.to(mobileMenuRef.current, { 
        height: 0, 
        opacity: 0, 
        duration: 0.3, 
        ease: "power2.in" 
      });
      tl.to(burgerRef.current.children[0], { 
        y: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" 
      }, "-=0.2");
      tl.to(burgerRef.current.children[2], { 
        y: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" 
      }, "-=0.3");
      tl.to(burgerRef.current.children[1], { 
        scaleX: 1, opacity: 1, duration: 0.3 
      }, "-=0.2");
    }
  };

  // Dynamic hover effects for links
  const handleLinkHover = (index) => {
    setHoverIndex(index);
    
    if (linksRef.current[index]) {
      const linkBounds = linksRef.current[index].getBoundingClientRect();
      
      // Emit particles at link position
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const x = linkBounds.left + linkBounds.width / 2 + (Math.random() * 40 - 20);
          const y = linkBounds.top + linkBounds.height / 2 + (Math.random() * 10 - 5);
          
          // Expanded color palette with more vibrant neon colors
          const neonColors = [
            `rgba(${Math.random() * 50 + 100}, ${Math.random() * 50}, ${Math.random() * 100 + 155}, ${Math.random() * 0.5 + 0.5})`, // Purple/Blue
            `rgba(${Math.random() * 50}, ${Math.random() * 100 + 155}, ${Math.random() * 50}, ${Math.random() * 0.5 + 0.5})`, // Green
            `rgba(${Math.random() * 100 + 155}, ${Math.random() * 50}, ${Math.random() * 100 + 155}, ${Math.random() * 0.5 + 0.5})`, // Pink/Magenta
            `rgba(${Math.random() * 50}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 0.5 + 0.5})`, // Cyan
            `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 50}, ${Math.random() * 0.5 + 0.5})`, // Yellow
          ];
          const randomNeonColor = neonColors[Math.floor(Math.random() * neonColors.length)];
          
          particles.current.push({
            x,
            y,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 3 - 2,
            color: randomNeonColor,
            life: 50 + Math.random() * 30,
            opacity: Math.random() * 0.5 + 0.5
          });
        }, i * 20);
      }
    
      // Animate the hovered link
      gsap.to(linksRef.current[index], {
        scale: 1.15,
        color: "#ffffff",
        textShadow: "0 0 12px rgba(125,90,255,0.8), 0 0 20px rgba(80,150,255,0.4)",
        duration: 0.3,
        ease: "power2.out"
      });
    
      // Liquid effect on the indicator with elastic movement
      gsap.to(indicatorRef.current, {
        scaleX: 1.2,
        scaleY: 1.5,
        backgroundColor: "rgba(125,90,255,0.8)",
        boxShadow: "0 0 15px rgba(125,90,255,0.5)",
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      });
    
      // Scale down other links slightly
      linksRef.current.forEach((link, idx) => {
        if (idx !== index) {
          gsap.to(link, {
            scale: 0.95,
            opacity: 0.7,
            duration: 0.3
          });
        }
      });
    }
  };

  const handleLinkHoverExit = (index) => {
    setHoverIndex(null);
    
    if (linksRef.current[index]) {
      gsap.to(linksRef.current[index], {
        scale: 1,
        color: location.pathname === navLinks[index].path ? "#8A2BE2" : "rgba(255, 255, 255, 0.9)",
        textShadow: "none",
        duration: 0.3
      });
    
      // Restore indicator
      gsap.to(indicatorRef.current, {
        scaleX: 1,
        scaleY: 1,
        backgroundColor: "rgba(125,90,255,0.5)",
        boxShadow: "0 0 5px rgba(80,150,255,0.3)",
        duration: 0.3
      });
    
      // Restore other links
      linksRef.current.forEach((link, idx) => {
        if (idx !== index) {
          gsap.to(link, {
            scale: 1,
            opacity: 1,
            duration: 0.3
          });
        }
      });
    }
  };
  
  // Logo hover effect
  const handleLogoHover = () => {
    logoHovered.current = true;
    
    // Create pulsating glow effect
    gsap.to(logoRef.current, {
      textShadow: "0 0 10px rgba(125,90,255,0.8), 0 0 20px rgba(80,150,255,0.4)",
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out"
    });
    
    // Emit particles from logo
    const logoRect = logoRef.current.getBoundingClientRect();
    const centerX = logoRect.left + logoRect.width / 2;
    const centerY = logoRect.top + logoRect.height / 2;
    
    // Circular particle burst
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const distance = Math.random() * 15 + 5;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      setTimeout(() => {
        particles.current.push({
          x,
          y,
          size: Math.random() * 3 + 1,
          speedX: Math.cos(angle) * (Math.random() * 2 + 1),
          speedY: Math.sin(angle) * (Math.random() * 2 + 1),
          color: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 50}, ${Math.random() * 100 + 155}, ${Math.random() * 0.7 + 0.3})`,
          life: 60 + Math.random() * 40,
          opacity: Math.random() * 0.5 + 0.5
        });
      }, i * 25);
    }
  };
  
  const handleLogoHoverExit = () => {
    logoHovered.current = false;
    
    gsap.to(logoRef.current, {
      textShadow: "none",
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <>
      <canvas 
        ref={particleCanvasRef} 
        className="fixed top-0 left-0 w-full h-20 z-50 pointer-events-none"
      />
      
      <nav 
        ref={navbarRef} 
        className="fixed top-0 left-0 w-full z-40 px-6 py-4 backdrop-blur-lg bg-black bg-opacity-60 transition-all duration-300"
      >
        {/* Desktop navbar */}
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            ref={logoRef} 
            className="text-purple-600 font-bold text-2xl cursor-pointer transition-all duration-300 px-3 py-1 rounded-lg"
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoHoverExit}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 transition-all duration-500">
              Vibe
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-12 relative">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                ref={el => linksRef.current[index] = el}
                onMouseEnter={() => handleLinkHover(index)}
                onMouseLeave={() => handleLinkHoverExit(index)}
                className={`text-lg font-medium transition-all duration-300 px-2 py-1 ${
                  location.pathname === link.path ? 'text-purple-600' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Animated indicator for active link */}
            <div 
              ref={indicatorRef}
              className="absolute -bottom-2 h-1 bg-purple-600 bg-opacity-50 rounded-full transition-all duration-300 opacity-0"
            />
          </div>

          {/* Auth button */}
          <div className="hidden md:block">
            <Link 
              to="/auth"
              className="relative overflow-hidden bg-gradient-to-r from-indigo-800 to-purple-900 text-white px-6 py-2 rounded-full 
                         hover:shadow-[0_0_15px_rgba(125,90,255,0.6)] transition-all duration-300 transform hover:scale-105 group"
            >
              <span className="relative z-10">Sign In</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></span>
            </Link>
          </div>

          {/* Mobile menu burger */}
          <button 
            ref={burgerRef}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            onClick={handleBurgerClick}
          >
            <span className="w-full h-0.5 bg-purple-600 rounded-full transform transition-all duration-300"></span>
            <span className="w-full h-0.5 bg-purple-600 rounded-full transform transition-all duration-300"></span>
            <span className="w-full h-0.5 bg-purple-600 rounded-full transform transition-all duration-300"></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed top-16 left-0 w-full bg-black bg-opacity-95 backdrop-blur-lg z-40 
                   flex flex-col items-center space-y-4 py-4 overflow-hidden opacity-0 h-0"
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-lg font-medium px-4 py-2 w-full text-center transform transition-all duration-300 hover:scale-110 hover:text-purple-500 ${
              location.pathname === link.path ? 'text-purple-600' : 'text-white'
            }`}
            onClick={handleBurgerClick}
          >
            {link.label}
          </Link>
        ))}
        <Link 
          to="/auth"
          className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white px-6 py-2 rounded-full mt-4
                     transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(125,90,255,0.6)]"
          onClick={handleBurgerClick}
        >
          Sign In
        </Link>
      </div>
    </>
  );
};

export default Navbar;