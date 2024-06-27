pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'calculator-app'
        REPO_URL = 'https://github.com/JuanPabloTraining/angular-calculator.git'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}", '.')
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
4                    docker.image("${DOCKER_IMAGE}").inside {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def container = docker.image("${DOCKER_IMAGE}")
                    container.run('-d -p 4200:80 --name calculator-app-container')
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
