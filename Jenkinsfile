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
                sh 'npm install' // Install project dependencies
            }
        }
        stage('Test') {
            steps {
                sh 'npm test' // Run tests
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("my-angular-app:${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.withRegistry('https://your-docker-registry', 'docker-hub-credentials') {
                        docker.image("my-angular-app:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }
    }
}
