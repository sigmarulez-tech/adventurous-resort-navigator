
interface AnimateOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const animateOnScroll = (
  selector: string, 
  animationClass: string, 
  options: AnimateOptions = {}
) => {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;
  
  const elements = document.querySelectorAll(selector);
  
  if (!elements.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          entry.target.classList.remove(animationClass);
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );
  
  elements.forEach((el) => {
    observer.observe(el);
  });
  
  return () => {
    elements.forEach((el) => observer.unobserve(el));
  };
};

export const staggerChildren = (
  parentSelector: string, 
  childSelector: string, 
  animationClass: string,
  staggerDelay: number = 0.1
) => {
  const parents = document.querySelectorAll(parentSelector);
  
  if (!parents.length) return;
  
  parents.forEach((parent) => {
    const children = parent.querySelectorAll(childSelector);
    
    children.forEach((child, index) => {
      (child as HTMLElement).style.animationDelay = `${index * staggerDelay}s`;
      child.classList.add(animationClass);
    });
  });
};
