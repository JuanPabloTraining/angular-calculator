pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Install packages') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run the tests') {
            steps {
                script {
                    sh 'ng test --watch=false'
                }
            }
        }

        stage('Run the App') {
            steps {
                script {
                    sh 'ng serve &'
                    sleep 5
                }
            }
        }
    }
}
