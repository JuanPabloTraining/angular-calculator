pipeline {
    agent {
        docker {
            image 'node:14'
            args '-p 3000:80'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'sudo chown -R 111:113 "/.npm'
                sh 'npm install' // Instala las dependencias del proyecto
            }
        }
        stage('Test') {
            steps {
                sh 'npm test' // Ejecuta los tests
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("my-angular-app:${env.BUILD_NUMBER}") // Construye la imagen Docker
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.withRegistry('https://your-docker-registry', 'docker-hub-credentials') {
                        docker.image("my-angular-app:${env.BUILD_NUMBER}").push() // Publica la imagen en el registro Docker
                    }
                }
            }
        }
    }
}
