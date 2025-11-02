// Script principal consolidado do MundoPet

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FUNÇÕES UTILITÁRIAS =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const closeButtons = modal.querySelectorAll('.modal-close, [data-modal-close]');
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
        
        toast.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
    }

    // ===== NAVEGAÇÃO (Todas as páginas) =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ===== DROPDOWN MENU PARA MOBILE =====
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // ===== NEWSLETTER (Index) =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                showModal('success-modal');
                emailInput.value = '';
                console.log('Email cadastrado:', email);
            } else {
                showToast('Por favor, insira um email válido.', 'error');
            }
        });
    }

    // ===== ADOÇÃO (Página adoção) =====
    const speciesFilter = document.getElementById('species');
    const petCards = document.querySelectorAll('.pet-card');
    
    function filterPets() {
        if (!speciesFilter) return;

        const speciesValue = speciesFilter.value;
        const sizeValue = document.getElementById('size')?.value || 'all';
        const ageValue = document.getElementById('age')?.value || 'all';
        const genderValue = document.getElementById('gender')?.value || 'all';

        let visibleCount = 0;

        petCards.forEach(card => {
            const cardSpecies = card.dataset.species;
            const cardSize = card.dataset.size;
            const cardAge = card.dataset.age;
            const cardGender = card.dataset.gender;

            const speciesMatch = speciesValue === 'all' || cardSpecies === speciesValue;
            const sizeMatch = sizeValue === 'all' || cardSize === sizeValue;
            const ageMatch = ageValue === 'all' || cardAge === ageValue;
            const genderMatch = genderValue === 'all' || cardGender === genderValue;

            if (speciesMatch && sizeMatch && ageMatch && genderMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const petsCount = document.getElementById('pets-count');
        if (petsCount) petsCount.textContent = visibleCount;
    }

    // Adicionar event listeners aos filtros
    if (speciesFilter) speciesFilter.addEventListener('change', filterPets);
    if (document.getElementById('size')) document.getElementById('size').addEventListener('change', filterPets);
    if (document.getElementById('age')) document.getElementById('age').addEventListener('change', filterPets);
    if (document.getElementById('gender')) document.getElementById('gender').addEventListener('change', filterPets);

    // ===== MODAL DE ANIMAIS (página adoção) =====
    const petModal = document.getElementById('pet-modal');
    const modalPetImage = document.getElementById('modal-pet-image');
    const modalPetName = document.getElementById('modal-pet-name');
    const modalPetSpecies = document.getElementById('modal-pet-species');
    const modalPetAge = document.getElementById('modal-pet-age');
    const modalPetSize = document.getElementById('modal-pet-size');
    const modalPetGender = document.getElementById('modal-pet-gender');
    const modalPetDescription = document.getElementById('modal-pet-description');
    const modalPetTraits = document.getElementById('modal-pet-traits');
    const adoptPetButton = document.getElementById('adopt-pet');

    // Dados dos animais
    const petsData = {
        'thor': {
            name: 'Thor',
            image: 'assets/img/dog-1.jpg',
            species: 'Cachorro',
            age: '2 anos',
            size: 'Porte médio',
            gender: 'Macho',
            description: 'Thor é um cachorro brincalhão e muito carinhoso. Adora passeios e se dá bem com crianças e outros animais.',
            traits: ['Carinhoso', 'Brincalhão', 'Sociável']
        },
        'luna': {
            name: 'Luna',
            image: 'assets/img/cat-1.jpg',
            species: 'Gata',
            age: '1 ano',
            size: 'Porte pequeno',
            gender: 'Fêmea',
            description: 'Luna é uma gata tranquila e independente. Gosta de carinho no seu próprio tempo e adora observar pela janela.',
            traits: ['Calma', 'Independente', 'Curiosa']
        },
        'mel': {
            name: 'Mel',
            image: 'assets/img/dog-2.jpg',
            species: 'Cachorro',
            age: '4 meses',
            size: 'Porte pequeno',
            gender: 'Fêmea',
            description: 'Mel é uma cachorrinha filhote muito dócil e brincalhona. Está esperando por um lar amoroso para crescer com carinho.',
            traits: ['Dócil', 'Brincalhona', 'Inteligente']
        }
    };

    // Abrir modal do animal
    document.querySelectorAll('[data-pet-modal]').forEach(button => {
        button.addEventListener('click', function() {
            const petId = this.dataset.petModal;
            const petData = petsData[petId];

            if (petData && modalPetImage) {
                modalPetImage.src = petData.image;
                modalPetImage.alt = `${petData.name} - ${petData.species} para adoção`;
                modalPetName.textContent = petData.name;
                modalPetSpecies.textContent = petData.species;
                modalPetAge.textContent = petData.age;
                modalPetSize.textContent = petData.size;
                modalPetGender.textContent = petData.gender;
                modalPetDescription.textContent = petData.description;

                // Limpar e adicionar traits
                if (modalPetTraits) {
                    modalPetTraits.innerHTML = '';
                    petData.traits.forEach(trait => {
                        const traitSpan = document.createElement('span');
                        traitSpan.className = 'pet-trait';
                        traitSpan.textContent = trait;
                        modalPetTraits.appendChild(traitSpan);
                    });
                }

                // Configurar botão de adoção
                if (adoptPetButton) {
                    adoptPetButton.onclick = function() {
                        window.location.href = 'contatos.html?subject=adoption&pet=' + encodeURIComponent(petData.name);
                    };
                }

                // Mostrar modal
                if (petModal) {
                    petModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    // ===== CARREGAR MAIS ANIMAIS (página adoção) =====
    const loadMoreButton = document.getElementById('load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            // Simular carregamento de mais animais
            this.innerHTML = '<span class="loading"><span class="loading-spinner"></span>Carregando...</span>';
            this.disabled = true;

            setTimeout(() => {
                // Em uma aplicação real, aqui carregaríamos mais dados da API
                this.innerHTML = 'Todos os animais carregados';
                this.disabled = true;
                this.style.opacity = '0.6';
            }, 1500);
        });
    }

    // ===== CONTATO (Página contato) =====
    const contactForm = document.getElementById('contact-form');
    
    function showContactError(fieldName, message) {
        const errorElement = document.getElementById(fieldName + '-error');
        const inputElement = document.getElementById(fieldName);
        if (errorElement && inputElement) {
            errorElement.textContent = message;
            inputElement.classList.add('error');
        }
    }

    function clearContactErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => el.classList.remove('error'));
    }

    function validateContactForm() {
        let isValid = true;
        clearContactErrors();

        const fields = [
            { id: 'name', validator: (v) => v && v.length >= 2, error: 'Nome deve ter pelo menos 2 caracteres' },
            { id: 'email', validator: validateEmail, error: 'E-mail inválido' },
            { id: 'subject', validator: (v) => v, error: 'Selecione um assunto' },
            { id: 'message', validator: (v) => v && v.length >= 10, error: 'Mensagem deve ter pelo menos 10 caracteres' }
        ];

        fields.forEach(({ id, validator, error }) => {
            const field = document.getElementById(id);
            if (field && field.hasAttribute('required')) {
                if (!validator(field.value.trim())) {
                    showContactError(id, error);
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<span class="loading"><span class="loading-spinner"></span>Enviando...</span>';
                submitButton.disabled = true;

                setTimeout(() => {
                    showModal('success-modal');
                    contactForm.reset();
                    clearContactErrors();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        });

        // Validação em tempo real
        document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required')) {
                    const value = this.value.trim();
                    if (!value) showContactError(this.id, 'Campo obrigatório');
                }
            });
            
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorElement = document.getElementById(this.id + '-error');
                if (errorElement) errorElement.textContent = '';
            });
        });
    }

    // ===== FAQ ACCORDION (página contato) =====
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        if (question && answer && icon) {
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                // Fechar todos os itens
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherItem !== item && otherAnswer && otherIcon) {
                        otherAnswer.style.display = 'none';
                        otherIcon.textContent = '+';
                    }
                });
                
                // Alternar item atual
                if (isOpen) {
                    answer.style.display = 'none';
                    icon.textContent = '+';
                } else {
                    answer.style.display = 'block';
                    icon.textContent = '−';
                }
            });
        }
    });

    // ===== MÁSCARA DE TELEFONE (página contato) =====
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }
            
            e.target.value = value;
        });
    }

    // ===== OTIMIZAÇÕES GERAIS =====
    
    // Lazy loading para imagens
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(img => {
            img.loading = 'lazy';
        });
    }

    // Tratar erro de carregamento de imagem
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/img/placeholder.jpg';
            this.alt = 'Imagem não disponível';
        });
    });

    // Botões com estados de carregamento
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('btn-loading')) return;
            
            // Simular estado de loading em alguns botões
            if (this.type === 'submit' || this.getAttribute('href') === '#') {
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="loading"><span class="loading-spinner"></span>Carregando...</span>';
                this.classList.add('btn-loading');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('btn-loading');
                }, 2000);
            }
        });
    });

    // Animações de scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.highlight-card, .pet-card, .section-title').forEach(el => {
        observer.observe(el);
    });

    console.log('MundoPet - Sistema carregado com sucesso!');
});