pipeline {
    agent any

    environment {
        // Docker Hub credentials (configure these in Jenkins credentials)
        DOCKER_CREDENTIALS = 'docker-hub-credential'
        // Docker image name and tag
        DOCKER_IMAGE = 'jathinch/translator-webapp'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        // Stage 1: Checkout code from GitHub
        stage('Checkout') {
            steps {
                // Simple checkout without additional configuration
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/Jathin-Chetty/classy-spanish-scribe.git']]
                ])
            }
        }

        // Stage 2: Build Docker image
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        // Stage 3: Test placeholder
        stage('Test') {
            steps {
                echo 'Tests skipped - placeholder stage'
            }
        }

        // Stage 4: Push to Docker Hub
        stage('Push') {
            steps {
                script {
                    try {
                        // Login to Docker Hub with explicit registry URL
                        docker.withRegistry('https://registry.hub.docker.com', DOCKER_CREDENTIALS) {
                            // Push the image with build number tag
                            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                            // Also push as latest
                            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push('latest')
                        }
                    } catch (Exception e) {
                        error "Failed to push Docker image: ${e.message}"
                    }
                }
            }
        }
    }

    // Post-build actions
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 