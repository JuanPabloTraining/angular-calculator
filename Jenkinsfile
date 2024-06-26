pipeline {
    agent {
        docker {
            image 'node:14' // Use a Node.js image
            args '-p 3000:80' // Map the app's port to host
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